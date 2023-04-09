const asyncHandler = require('express-async-handler');
const generateToken = require('../config/token');
const Police = require('../models/police');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

//registering a user
const registerPolice = asyncHandler(async (req, res) => {
    const { name, email, serviceNumber, rank, password, cpassword } = req.body;

    if (!name || !email || !serviceNumber || !rank || !password || !cpassword) {
        res.status(400).json({ "error": "Please fill all the fields" });
        return;
    }

    // checking if email is already registered
    const policeExists = await Police.findOne({ email });
    if (policeExists) {
        res.status(400).json({ "error": "Police already registered" });
        return;
    }

    var salt = bcrypt.genSaltSync(12);
    const police = new Police({
        name, email, serviceNumber, rank,
        password: bcrypt.hashSync(password, salt),
        cpassword: bcrypt.hashSync(cpassword, salt)
    })

    const result = police.save();
    //registration is successful
    if (result) {
        res.status(201).json({
            _id: police.id,
            name: police.name,
            email: police.email,
            serviceNumber: police.serviceNumber,
            rank: police.rank,
            password: police.password,
            cpassword: police.cpassword,
            token: generateToken(police.id)
        })
    }

    //regsitrarion is not successful
    else {
        res.status(400).json({ "error": "Failed to create police" });
    }

})

//verifying a registered user(Login)
const loginPolice = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // console.log(req.body);

    const policeFound = await Police.findOne({ email });
    const id = policeFound.id;

    if (!policeFound) {
        res.status(400).json({ "error": "invalid credentials" });
        return;
    }
    if (policeFound) {
        if (bcrypt.compareSync(password, policeFound.password)) {
            const loggedInPolice = await Police.findById({ _id: policeFound._id });

            res.status(201).json({
                loggedInPolice, token: generateToken(policeFound.id),

            })

        }
        else {
            res.status(400).json({ "error": "Invalid Credentials" })
        }
    }
})

module.exports = { registerPolice, loginPolice };