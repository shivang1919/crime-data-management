const express=require('express');
const router=express.Router();
const {registerPolice,loginPolice}=require('../controllers/policeController');
const {registerMissingperson} = require("../controllers/missingperson")
router.post('/register',registerPolice);
router.post('/login',loginPolice);
router.post('/registermissing',registerMissingperson)
module.exports=router;