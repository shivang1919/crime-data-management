const asyncHandler=require('express-async-handler');
const Missingperson = require("../models/missingperson")

const registerMissingperson = asyncHandler(async(req,res)=>{
    const {name , age , place , aadhar,description,personreporting}= req.body;
    if(!name || !age || !place || !aadhar || !description || !personreporting){
        res.status(400).json({"error":"Please fill all the fields"});
        return;
    }
    const newMissingperson = await Missingperson({
        name,age,place,aadhar,description, personreporting
    })
    const result = newMissingperson.save()
    if(result){
        res.status(201).json({
            name:newMissingperson.name,
            age:newMissingperson.age,
            place:newMissingperson.place,
            aadhar:newMissingperson.aadhar,
            description:newMissingperson.description,
            personreporting:newMissingperson.personreporting,
            found: false
        })
    }
    else {
        res.status(400).json({ "error": "Failed to create missing person" });
    }
})
const getAllMissingPerson = async(req,res) => {
    const {name,age,place,description} = req.query
    const queryObject = {};
    if(name){
        queryObject.name = name;
    }
    if(age){
        queryObject.age = age;
    }
    if(place){
        queryObject.place = place;
    }
    if(description){
        queryObject.description = description
    }
    const myMissingPerson = await Missingperson.find(queryObject)
    res.status(200).json({myMissingPerson})
}
module.exports = {registerMissingperson,getAllMissingPerson}