const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController');
const router=express.Router();
// Add inventory (post)
router.post('/create-inventory',authMiddleware,createInventoryController);
// Get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController)
module.exports=router;
