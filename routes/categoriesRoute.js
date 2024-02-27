const express = require("express");
const router = express.Router();
const { addCategory,getAllCategories} = require("../controllers/categoriesController");
const{isLoggedIn} =require("../middlewares/isLoggedIn");
const{isAdmin} =require("../middlewares/isAdmin");
router.get("/categories",getAllCategories);
router.post("/categories/addCategory",isLoggedIn,isAdmin,addCategory);

module.exports = router;
