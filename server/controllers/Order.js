const Order = require("../models/Order");
const ManufacturingUnit = require("../models/ManufacturingUnit");
const Warehouse = require("../models/Warehouse");
const QRCode = require("qrcode");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const generateUniqueId = require("generate-unique-id");
const getRanHex = size => {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}


/**
 * 
 * Purpose : creating Order By the Ware House manager
 * 
 * URL : /api/v1/order/create
 *  
 * */
exports.createOrder = async (req, res) => {
  try {
    const {
      selectedProducts,
      manufacturerId,
      estimatedDeliveryDate,
      warehouseId,
    } = req.body;

    // Validate inputs
    if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide selected products with their details.",
      });
    }

    selectedProducts.forEach(product => {
      product.productId = getRanHex(24); // Generating a random 24 character string
    });

    if (!manufacturerId || !estimatedDeliveryDate || !warehouseId) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer ID, warehouse ID, and estimated delivery date are required.",
      });
    }

    // Validate manufacturer and warehouse
    const manufacturer = await ManufacturingUnit.findById(manufacturerId);
    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found. Please provide a valid manufacturer ID.",
      });
    }

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found. Please provide a valid warehouse ID.",
      });
    }

    // Generate a unique 8-digit ID for the order
    const uniqueOrderId = generateUniqueId({ length: 8 });

    // Save the order details
    const order = await Order.create({
      uniqueOrderId,
      selectedProducts,
      manufacturerId,
      manufacturerName: manufacturer.companyName,
      manufacturerAddress: manufacturer?.companyAddress,
      warehouseId,
      warehouseName: warehouse?.warehouseName,
      warehouseArea: warehouse?.warehouseArea,
      warehouseAddress: warehouse?.warehouseAddress,
      estimatedDeliveryDate,
    });

    // Link the generated order ID with the manufacturer and warehouse
    if (!manufacturer.linkedWarehouses) manufacturer.linkedWarehouses = [];
    if (!warehouse.linkedManufacturers) warehouse.linkedManufacturers = [];

    if (!manufacturer.linkedWarehouses.includes(warehouseId)) {
      manufacturer.linkedWarehouses.push(warehouseId);
    }
    if (!warehouse.linkedManufacturers.includes(manufacturerId)) {
      warehouse.linkedManufacturers.push(manufacturerId);
    }

    // Add the order ID to the manufacturer and warehouse
    if (!manufacturer.linkedOrders) manufacturer.linkedOrders = [];
    if (!warehouse.linkedOrders) warehouse.linkedOrders = [];

    manufacturer.linkedOrders.push(order._id);
    warehouse.linkedOrders.push(order._id);

    // Save the updated manufacturer and warehouse
    await manufacturer.save();
    await warehouse.save();

    // Generate QR code data
    const qrData = {
      uniqueOrderId,
      orderId: order._id,
      warehouseId,
      warehouseManagerId: warehouse.managerId,
    };

    // Generate the QR code
    const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrData));

    // Upload the QR code image to Cloudinary
    const uploadResult = await uploadImageToCloudinary(
      { path: qrCodeImage },
      "orders/qr-codes"
    );

    // Save the QR code URL to the order
    order.qrCodeImageUrl = uploadResult.secure_url;
    await order.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Error creating the order:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the order.",
      error: error.message,
    });
  }
};

exports.getOrdersByWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    // Validate warehouseId
    if (!warehouseId) {
      return res.status(400).json({
        success: false,
        message: "Warehouse ID is required.",
      });
    }

    // Fetch the warehouse
    const warehouse = await ManufacturingUnit.findById(warehouseId)

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found.",
      });
    }

    const orders = await Order.find({
      warehouseId: warehouseId,
    });

    // Return response
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    // Return response
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
      error: error.message,
    });
  }
};

exports.getOrdersByManufacturer = async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    // Validate manufacturerId
    if (!manufacturerId) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer ID is required.",
      });
    }

    // Fetch the manufacturer
    const manufacturer = await ManufacturingUnit.findById(manufacturerId)

    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found.",
      });
    }

    const orders = await Order.find({
      manufacturerId: manufacturerId,
    });

    // Return response
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
      error: error.message,
    });
  }
};

/**
 * 
 * Purpose :  Route to fetch manufacturer details with linked warehouses and orders
 * 
 * URL : /api/v1/order/manufacturer/:manufacturerId/details
 *  
 * */
exports.getManufacturerDetails = async (req, res) => {
  try {
    const { manufacturerId } = req.params; // Extract manufacturerId from request parameters

    // Validate manufacturerId
    if (!manufacturerId) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer ID is required.",
      });
    }

    // Fetch the manufacturer
    const manufacturer = await ManufacturingUnit.findById(manufacturerId)
      .populate("linkedWarehouses") // Populate linked warehouses
      .populate("linkedOrders"); // Populate linked orders

    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found.",
      });
    }

    // Fetch warehouse and corresponding orders
    const warehouseOrderDetails = await Promise.all(
      manufacturer.linkedWarehouses.map(async (warehouseId) => {
        // Fetch warehouse details
        const warehouse = await Warehouse.findById(warehouseId);

        // Fetch orders linked to this warehouse for this manufacturer
        const orders = await Order.find({
          manufacturerId: manufacturerId,
          warehouseId: warehouseId,
        });

        return {
          warehouseDetails: warehouse,
          orders: orders,
        };
      })
    );

    // Return response
    return res.status(200).json({
      success: true,
      manufacturerDetails: {
        companyName: manufacturer.companyName,
        companyAddress: manufacturer.companyAddress,
        companyArea: manufacturer.companyArea,
        companyDescription: manufacturer.companyDescription,
        linkedWarehouses: warehouseOrderDetails,
      },
    });
  } catch (error) {
    console.error("Error fetching manufacturer details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching manufacturer details.",
      error: error.message,
    });
  }
};


exports.completeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found.",
      });
    }

    // Fetch the manufacturer
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },                // filter
      { $set: { orderStatus: 'fulfilled', actualDeliveryDate: Date.now() } }, // update
      { new: true, runValidators: true } // options
    );

    // Return response
    return res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fulfilling order.",
      error: error.message,
    });
  }
};