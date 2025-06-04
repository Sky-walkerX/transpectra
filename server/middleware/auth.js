// Importing required modules
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { CONFIG } = require('../constants/config');
const Store = require('../models/Store');
const DistributionCenter = require('../models/DistributionCenter')


// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
    console.log("\n=== Auth Middleware Debug ===");
    console.log("Request URL:", req.originalUrl);
    console.log("Request Method:", req.method);
    console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Request Cookies:", JSON.stringify(req.cookies, null, 2));
    console.log("Request Body:", JSON.stringify(req.body, null, 2));

    try {
        // Get token from Authorization header or cookies
        let token = null;

        // Check Authorization header first
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
            console.log("Token found in Authorization header");
        }
        // Then check cookies
        else if (req.cookies.token) {
            token = req.cookies.token;
            console.log("Token found in cookies");
        }

        if (!token) {
            console.log("No token found in any source");
            return res.status(401).json({
                success: false,
                message: "Authentication token missing"
            });
        }

        try {
            console.log("JWT Secret:", "2187937891634982701" ? "Present" : "Missing");
            // Verify token
            const decoded = jwt.verify(token, "2187937891634982701");
            console.log("Token verified successfully. User:", decoded.email);
            
            // Attach user to request
            req.user = decoded;
            console.log("User data attached to request");
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

exports.isDriver = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails.accountType !== CONFIG.ACCOUNT_TYPE.DRIVER) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Drivers",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

exports.isStoreManager = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails.accountType !== CONFIG.ACCOUNT_TYPE.STORE) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for StoreManger",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

exports.isDistributionCenterManager = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        console.log(userDetails);

        console.log(userDetails.accountType);

        if (userDetails.accountType !== CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Distribution Center Manager",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

exports.isStore = async (req, res, next) => {
    try {
        const StoreDetails = await Store.findById(req.store.id);

        if (StoreDetails.type !== CONFIG.ACCOUNT_TYPE.DRIVER) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Drivers",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

exports.isDistributionCenter = async (req, res, next) => {
    try {
        const userDetails = await DistributionCenter.findOne({ email: req.user.email });

        if (userDetails.accountType !== CONFIG.ACCOUNT_TYPE.DRIVER) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Drivers",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};