const express=require('express');
const router=express.Router();
const {registerUser,loginUser,userOTP,resendUserOTP}=require('../controllers/userController');
const {getAllMissingPerson} = require("../controllers/missingperson")
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/verifyOtp',userOTP);
router.post('/resendOtp',resendUserOTP);
router.get('/getmissing',getAllMissingPerson)
module.exports=router;