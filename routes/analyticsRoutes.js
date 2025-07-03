const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganizationController, getOrganizationForHospitalController, getInventoryHospitalController } = require('../controllers/inventoryController');
const { bloodGroupDetailsController } = require('../controllers/analyticsController');
const router=express.Router();
// routes
// get blood data
router.get('/bloodGroups-data',authMiddleware,bloodGroupDetailsController);

module.exports=router;
