
const cloudinary = require("../imageUploadHelper/cloudinary");
const fs = require("fs")

const uploadImageController = async (req, res) => {
  try {
    // check file is uploaded or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required, please upload a file",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.log("Image upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, Image can't be uploaded",
    });
  }
};

module.exports = { uploadImageController };
