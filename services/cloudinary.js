const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        
        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // Check if upload was successful
        if (response && response.url) {
            // File has been uploaded
            console.log("File has been uploaded to Cloudinary:", response.url);
            // Remove locally saved file
            fs.unlinkSync(localFilePath);
            return response; 
        } else {
            // If upload failed, remove locally saved file
            console.error("Failed to upload file to Cloudinary");
            fs.unlinkSync(localFilePath);
            return null;
        }
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        // If upload failed due to error, remove locally saved file
        fs.unlinkSync(localFilePath);
        return null;
    }
};

module.exports = { uploadCloudinary };