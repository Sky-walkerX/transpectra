import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchManufacturers } from "../../../services/oparations/CompanyAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../../services/oparations/warehouseAPI";
import { HiSparkles, HiExclamationTriangle } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { getLocAndCarbon } from "../../../services/getLocAndCarbon";
import { apiConnector } from "../../../services/apiConnector";

const SingleProductOrderPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const manufacturerList = useSelector((state) => state.manufacturers.manufacturers);
  const isLoading = useSelector((state) => state.manufacturers.isLoading);

  const product = location.state?.product || null;
  const category = location.state?.category || "Uncategorized";

  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [specifications, setSpecifications] = useState("");
  const [manufacturerDetails, setManufacturerDetails] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [warehouse, setWarehouse] = useState(null);
  const [isLoadingWarehouse, setIsLoadingWarehouse] = useState(true);

  // Fetch warehouse details
  useEffect(() => {
    const fetchWarehouse = async () => {
      if (warehouse) return;
      if (user?._id) {
        setIsLoadingWarehouse(true);
        try {
          const response = await apiConnector("GET", "http://localhost:4000/api/v1/warehouse/"+user._id);
          if (response.data) {
            setWarehouse(response.data.warehouse);
          }
        } catch (error) {
          console.error("Error fetching warehouse:", error);
          toast.error("Failed to fetch warehouse details");
        } finally {
          setIsLoadingWarehouse(false);
        }
      }
    };

    fetchWarehouse();
  }, [user?._id]);

  // Fetch manufacturers on component mount
  useEffect(() => {
    if (manufacturerList.length === 0) dispatch(fetchManufacturers());
  }, [dispatch]);

  // Fetch distance and carbon details when manufacturers are loaded
  useEffect(() => {
    const fetchManufacturerDetails = async () => {
      if (manufacturerDetails.length !== 0) return;
      if (manufacturerList.length > 0 && warehouse?.warehouseAddress) {
        setIsLoadingDetails(true);
        try {
          const manufacturerAddresses = manufacturerList.map(m => m.companyAddress);
          const details = await getLocAndCarbon(warehouse.warehouseAddress, manufacturerAddresses);
          console.log(details)
          setManufacturerDetails(details);
          
          // Find manufacturer with minimum carbon footprint
          const minCarbonDetails = details.reduce((min, current) => 
            (!min || current.carbon < min.carbon) ? current : min
          , null);
          
          if (minCarbonDetails) {
            const minCarbonManufacturer = manufacturerList.find(m => 
              m.companyAddress.toLowerCase().includes(minCarbonDetails.cityName.toLowerCase())
            );
            if (minCarbonManufacturer) {
              setSelectedManufacturer(minCarbonManufacturer);
            }
          }
        } catch (error) {
          console.error("Error fetching manufacturer details:", error);
          toast.error("Failed to fetch manufacturer details");
        } finally {
          setIsLoadingDetails(false);
        }
      }
    };

    fetchManufacturerDetails();
  }, [manufacturerList, warehouse?.warehouseAddress]);

  const handleManufacturerSelect = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
  };

  const handleConfirmOrder = () => {
    if (!warehouse) {
      toast.error("Not a Proper Warehouse");
      return;
    }
    if (!selectedManufacturer) {
      toast.error("Please select a manufacturer");
      return;
    }
    if (!expectedDeliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }
    if (!orderQuantity || orderQuantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const formData = {
      manufacturerId: selectedManufacturer?._id,
      selectedProducts: [
        {
          productName: product.productName,
          quantity: orderQuantity,
          specifications: specifications,
        },
      ],
      estimatedDeliveryDate: expectedDeliveryDate,
      warehouseId: warehouse?._id,
    };
    
    dispatch(createOrder(formData, category, navigate));
  };

  if (!product) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 p-6">
          <p className="text-white text-center">No product selected for order.</p>
        </div>
      </div>
    );
  }

  if (isLoadingWarehouse) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 p-6">
          <p className="text-white text-center">Loading warehouse details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-richblue-800 to-richblue-900 text-white p-6 rounded-lg shadow-lg border border-richblue-700">
        <h1 className="text-2xl font-bold mb-2">Order for {product.productName}</h1>
        <p className="text-blue-25">Category: {category}</p>
        <p className="text-blue-25 mt-1">Warehouse: {warehouse?.warehouseName}</p>
      </div>

      {/* Product Details Card */}
      <div className="bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">{product.productName}</h2>
            <p className="text-blue-25">Current Stock: {product.quantity}</p>
            <p className="text-blue-25">Threshold: {product.threshold}</p>
          </div>
          {product.quantity < product.threshold && (
            <div className="flex items-center gap-2 text-[#FF2323]">
              <HiExclamationTriangle className="h-5 w-5" />
              <span>Low Stock</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Order Quantity</label>
            <input
              type="number"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Expected Delivery Date</label>
            <input
              type="date"
              value={expectedDeliveryDate}
              onChange={(e) => setExpectedDeliveryDate(e.target.value)}
              className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-white font-medium mb-2">Product Specifications</label>
          <input
            type="text"
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
            className="w-full px-4 py-2 bg-richblue-800 border border-richblue-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-richblue-500"
            placeholder="Enter specifications for the product"
          />
        </div>
      </div>

      {/* Manufacturers Selection */}
      <div className="bg-richblue-900 rounded-lg shadow-lg border border-richblue-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Select Manufacturer</h2>
        {isLoading ? (
          <div className="text-blue-25">Loading manufacturers...</div>
        ) : isLoadingDetails ? (
          <div className="text-blue-25">Loading manufacturer details...</div>
        ) : (
          <div className="space-y-4">
            {manufacturerList.map((manufacturer) => {
              const details = manufacturerDetails.find(
                d => manufacturer.companyAddress.toLowerCase().includes(d.cityName.toLowerCase())
              );
              
              // Find if this manufacturer has the minimum carbon footprint
              const isMinCarbon = details && manufacturerDetails.every(
                otherDetails => !otherDetails || details.carbon <= otherDetails.carbon
              );
              
              return (
                <div
                  key={manufacturer._id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 relative ${
                    selectedManufacturer?._id === manufacturer._id
                      ? "bg-richblue-800 border-richblue-100 shadow-lg shadow-richblue-500/20"
                      : "bg-richblue-800/50 border-richblue-700 hover:bg-richblue-800"
                  }`}
                  onClick={() => handleManufacturerSelect(manufacturer)}
                >
                  {isMinCarbon && (
                    <div className="absolute -top-3.5 -right-2.5">
                      <span className="px-3 py-1 text-xs font-medium bg-richblue-25 text-richblue-900 rounded-full shadow-lg border border-richblue-200">
                        Minimum Carbon Footprint
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedManufacturer?._id === manufacturer._id
                        ? "border-richblue-100 bg-richblue-100"
                        : "border-richblue-600"
                    }`}>
                      {selectedManufacturer?._id === manufacturer._id && (
                        <div className="w-2 h-2 rounded-full bg-richblue-900" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{manufacturer.companyName}</h3>
                      <p className="text-blue-25 text-sm mb-2">{manufacturer.companyAddress}</p>
                      {details && (
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div className="bg-richblue-900 p-2 rounded">
                            <p className="text-blue-25">Distance</p>
                            <p className="text-white font-medium">{details.dist} km</p>
                          </div>
                          <div className="bg-richblue-900 p-2 rounded">
                            <p className="text-blue-25">Carbon Footprint</p>
                            <p className="text-white font-medium">{details.carbon.toFixed(2)} kg</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate('/dashboard/inventory')}
          className="px-6 py-3 bg-richblue-800 text-white rounded-lg hover:bg-richblue-700 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmOrder}
          className="px-6 py-3 bg-richblue-600 text-white rounded-lg hover:bg-richblue-700 transition-colors font-medium flex items-center gap-2"
        >
          <HiSparkles className="h-5 w-5" />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default SingleProductOrderPage;
