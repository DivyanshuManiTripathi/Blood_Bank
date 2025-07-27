const express=require('express');
const { getDonarListController, getHospitalListController, getOrgListController, deleteDonarController } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
// router object
const router=express.Router();

// Routes
// GET || DONAR LIST
router.get('/donar-list',authMiddleware,adminMiddleware,getDonarListController)
// GET || HOSPITAL LIST
router.get('/hospital-list',authMiddleware,adminMiddleware,getHospitalListController)
// GET || ORGANIZATION LIST
router.get('/org-list',authMiddleware,adminMiddleware,getOrgListController)

// GET || DELETE DONAR
router.delete('/delete-donar/:id',authMiddleware,adminMiddleware,deleteDonarController);
// export 
module.exports= router;