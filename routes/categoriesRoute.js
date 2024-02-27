const express = require("express");
const router = express.Router();
const { addCategory,getAllCategories} = require("../controllers/categoriesController");
const{isLoggedIn} =require("../middlewares/isLoggedIn");
const{isAdmin} =require("../middlewares/isAdmin");
router.get("/categories",getAllCategories);
router.post("/categories/addcategory",isLoggedIn,isAdmin,addCategory);

module.exports = router;
