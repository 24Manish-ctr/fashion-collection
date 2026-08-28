const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// =====================================
// Upload Folder
// =====================================

const uploadPath = path.join(
    __dirname,
    "..",
    "public",
    "uploads"
);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true
    });
}

// =====================================
// Multer Storage
// =====================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

// =====================================
// Multer Upload
// =====================================

const upload = multer({
    storage: storage
});

// =====================================
// ADD PRODUCT
// POST /api/products/add
// =====================================

router.post(
    "/add",
    upload.single("image"),
    async (req, res) => {

        try {

            console.log("Product request received");

            console.log("Body:", req.body);

            console.log("File:", req.file);


            // Check required fields

            if (!req.body.name) {
                return res.status(400).json({
                    success: false,
                    message: "Product name is required"
                });
            }

            if (!req.body.price) {
                return res.status(400).json({
                    success: false,
                    message: "Product price is required"
                });
            }

            if (!req.body.category) {
                return res.status(400).json({
                    success: false,
                    message: "Product category is required"
                });
            }

            if (!req.body.description) {
                return res.status(400).json({
                    success: false,
                    message: "Product description is required"
                });
            }


            // =====================================
            // Save Product
            // =====================================

            const product = new Product({

                name: req.body.name,

                price: Number(req.body.price),

                category: req.body.category,

                description: req.body.description,

                image: req.file
                    ? req.file.filename
                    : ""

            });


            await product.save();


            console.log(
                "Product saved:",
                product
            );


            res.status(201).json({

                success: true,

                message:
                    "Product Added Successfully",

                product: product

            });


        } catch (error) {

            console.error(
                "ADD PRODUCT ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }
);


// =====================================
// GET ALL PRODUCTS
// GET /api/products
// =====================================

router.get("/", async (req, res) => {

    try {

        const products =
            await Product.find()
                .sort({
                    createdAt: -1
                });


        res.status(200).json(products);


    } catch (error) {

        console.error(
            "GET PRODUCTS ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = router;
