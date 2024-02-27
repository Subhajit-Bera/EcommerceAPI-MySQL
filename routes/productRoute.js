const express = require("express");
const router = express.Router();
const {addProduct,getAllProducts,getProductById} = require("../controllers/productController");
const{isLoggedIn} =require("../middlewares/isLoggedIn");
const{isAdmin} =require("../middlewares/isAdmin");

router.get("/products",getAllProducts);
router.get("/products/:id",getProductById);
router.post("/products/addproduct",isLoggedIn,isAdmin, addProduct);

module.exports = router;