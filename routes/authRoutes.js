const express=require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();
// routes
// Register (post)
router.post('/register',registerController)
// Login (post)
router.post('/login',loginController)
//Get current user (get)
router.get('/current-user',authMiddleware,currentUserController);
module.exports=router;