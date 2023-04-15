const express=require('express');
const router=express.Router();
const {registerPolice,loginPolice}=require('../controllers/policeController');
const {registerMissingperson,getAllMissingPerson} = require("../controllers/missingperson")
const {registerFir} = require("../controllers/fir")
router.post('/register',registerPolice);
router.post('/login',loginPolice);
router.post('/registermissing',registerMissingperson)
router.post('/registerfir',registerFir)
router.get('/getmissing',getAllMissingPerson)
module.exports=router;