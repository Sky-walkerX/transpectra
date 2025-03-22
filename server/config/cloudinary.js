const cloudinary = require("cloudinary").v2; // Cloudinary is being required and version is specified
const { CONFIG } = require('../constants/config')

exports.cloudinaryConnect = () => {
    try {
        //Configuring the Cloudinary to Upload MEDIA 
        cloudinary.config({
            cloud_name:'drapsfim0',
            api_key:'724777153863325',
            api_secret:'zMfqRhh29fbCEZ2qITc5obvqs6k',
        });
    } catch (error) {
        console.log(error); 
    }
};