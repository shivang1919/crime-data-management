const express=require('express');
const router=express.Router();
const {registerUser,loginUser,userOTP,resendUserOTP}=require('../controllers/userController');
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/verifyOtp',userOTP);
router.post('/resendOtp',resendUserOTP);
module.exports=router;