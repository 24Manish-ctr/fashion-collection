const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

// =============================
// Upload Folder Create
// =============================
const uploadPath = path.join(__dirname, "public", "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// =============================
// Multer Storage
// =============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
});

// =============================
// Middlewares
// =============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);

// =============================
// Routes
// =============================
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// =============================
// Test Route
// =============================
app.get("/", (req, res) => {
  res.send("Fashion Collection API Running...");
});

// =============================
// MongoDB Connection
// =============================
mongoose
  .connect("mongodb://127.0.0.1:27017/fashionCollection")
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// =============================
// Server Start
// =============================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = upload;