const express = require("express");
const router = express.Router();

const {
  getProductById,
  getProduct,
  getAllProducts,
  createProduct
} = require("../controllers/product");

router.post(
  "/product/create",
  createProduct
);


router.param("productId", getProductById);
router.get("/product/:productId", getProduct);
router.get("/products", getAllProducts);

module.exports = router;
