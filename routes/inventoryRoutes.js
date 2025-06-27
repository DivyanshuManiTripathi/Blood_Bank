const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganizationController, getOrganizationForHospitalController } = require('../controllers/inventoryController');
const router=express.Router();
// Add inventory (post)
router.post('/create-inventory',authMiddleware,createInventoryController);
// Get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController)
// Get donar records
router.get('/get-donars',authMiddleware,getDonarsController);
// Get hospital records
router.get('/get-hospitals',authMiddleware,getHospitalController);
// Get organization records
router.get('/get-organization',authMiddleware,getOrganizationController);
// Get organization records
router.get('/get-organization',authMiddleware,getOrganizationController);
// Get organization records
router.get('/get-organization-for-hospital',authMiddleware,getOrganizationForHospitalController);
module.exports=router;
