const express=require('express');
const router=express.Router();
const {registerPolice,loginPolice}=require('../controllers/policeController');
const {registerMissingperson} = require("../controllers/missingperson")
const {registerFir} = require("../controllers/fir")
router.post('/register',registerPolice);
router.post('/login',loginPolice);
router.post('/registermissing',registerMissingperson)
router.post('/registerfir',registerFir)
module.exports=router;