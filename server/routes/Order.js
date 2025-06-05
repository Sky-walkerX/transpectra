const express = require("express");
const router = express.Router();
const { 
    createOrder,
    getOrdersByManufacturer,
    getOrdersByWarehouse,
    getManufacturerDetails,
} = require("../controllers/Order");



/**
 * 
 * Purpose : creating Order By the Ware House manager
 * 
 * URL : /api/v1/order/create
 * 
 * Testing : Done
 * */ 
router.post("/create", createOrder);

/**
 * 
 * Purpose :  Route to fetch manufacturer details with linked warehouses and orders
 * 
 * URL : /api/v1/order/manufacturer/:manufacturerId/details
 *  
 * */ 

router.get("/warehouse/:warehouseId", getOrdersByWarehouse);

router.get("/manufacturer/:manufacturerId/details", getManufacturerDetails);

router.get("/manufacturer/:manufacturerId", getOrdersByManufacturer);


module.exports = router;
