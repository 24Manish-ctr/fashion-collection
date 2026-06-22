const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Upload folder automatically create
const uploadPath = path.join(__dirname, "..", "public", "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage
});

// Add Product
// Add Product
router.post("/add", upload.single("image"), async (req, res) => {
  try {

    // Image ko frontend/images/products me copy karo
    if (req.file) {
      const destinationFolder = path.join(
        __dirname,
        "..",
        "images",
        "products"
      );

      if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder, {
          recursive: true
        });
      }

      const sourcePath = req.file.path;

      const destinationPath = path.join(
        destinationFolder,
        req.file.filename
      );

      fs.copyFileSync(sourcePath, destinationPath);
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.file ? req.file.filename : ""
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
module.exports = router;