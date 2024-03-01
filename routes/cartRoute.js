const express = require("express");
const router = express.Router();
const {addToCart} = require("../controllers/cartController");
const{isLoggedIn} =require("../middlewares/isLoggedIn");

router.post("/add-to-cart",isLoggedIn,addToCart);
module.exports = router;