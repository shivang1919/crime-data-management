const asyncHandler = require('express-async-handler')
const Fir = require("../models/fir")

const registerFir = asyncHandler(async (req, res) => {
    const { State, District, PoliceStation, FIRno, Date, Acts, OccurenceDay, OccurenceDate, OccurenceTime, InformationReceivedDate, InformationReceivedDay, InformationReceivedTime, DiaryReferenceEntryNo, DiaryReferenceTime, DirectionAndDistancefromPS, BeatNo, Address, ComplainantName, ComplainantFatherorHusbandName, ComplainantDateOfBirth, ComplainantNationality, ComplainantOccupation, ComplainantPassportNo, ComplainantDateofIssue, ComplainantPlaceOfIssue, ComplainantAddress, DetailsOfSuspected, cadre, ReasonsforDelay, ParticularsOfPropertiesStolenInvolved } = req.body
    if (!State || !District || !PoliceStation || !FIRno || !Date || !Acts || !OccurenceDay || !OccurenceDate || !OccurenceTime || !InformationReceivedDate || !InformationReceivedDay || !InformationReceivedTime || !DiaryReferenceEntryNo || !DiaryReferenceTime || !DirectionAndDistancefromPS || !BeatNo || !Address || !ComplainantName || !ComplainantFatherorHusbandName || !ComplainantDateOfBirth || !ComplainantNationality || !ComplainantOccupation || !ComplainantDateofIssue || !ComplainantPlaceOfIssue || !ComplainantAddress || !DetailsOfSuspected || !cadre || !ParticularsOfPropertiesStolenInvolved) {
        res.status(400).json({ "error": "Please fill all the fields" });
        return;
    }
    const newFir = await Fir({
        State, District, PoliceStation, FIRno, Date, Acts, OccurenceDay, OccurenceDate, OccurenceTime, InformationReceivedDate, InformationReceivedDay, InformationReceivedTime, DiaryReferenceEntryNo, DiaryReferenceTime, DirectionAndDistancefromPS, BeatNo, Address, ComplainantName, ComplainantFatherorHusbandName, ComplainantDateOfBirth, ComplainantNationality, ComplainantOccupation, ComplainantPassportNo, ComplainantDateofIssue, ComplainantPlaceOfIssue, ComplainantAddress, DetailsOfSuspected, cadre, ReasonsforDelay, ParticularsOfPropertiesStolenInvolved
    })
    const result = newFir.save()
    if (result) {
        res.status(201).json({
            State: newFir.State,
            District: newFir.District,
            PoliceStation: newFir.PoliceStation,
            FIRno: newFir.FIRno,
            Date: newFir.Date,
            Acts: newFir.Acts,
            OccurenceDay: newFir.OccurenceDay,
            OccurenceDate: newFir.OccurenceDate,
            OccurenceTime: newFir.OccurenceTime,
            InformationReceivedDate: newFir.InformationReceivedDate,
            InformationReceivedDay: newFir.InformationReceivedDay,
            InformationReceivedTime: newFir.InformationReceivedTime,
            DiaryReferenceEntryNo: newFir.DiaryReferenceEntryNo,
            DiaryReferenceTime: newFir.DiaryReferenceTime,
            DirectionAndDistancefromPS: newFir.DirectionAndDistancefromPS,
            BeatNo: newFir.BeatNo,
            Address: newFir.Address,
            ComplainantName: newFir.ComplainantName,
            ComplainantFatherorHusbandName: newFir.ComplainantFatherorHusbandName,
            ComplainantDateOfBirth: newFir.ComplainantDateOfBirth,
            ComplainantNationality: newFir.ComplainantNationality,
            ComplainantOccupation: newFir.ComplainantOccupation,
            ComplainantPassportNo: newFir.ComplainantPassportNo,
            ComplainantDateofIssue: newFir.ComplainantDateofIssue,
            ComplainantPlaceOfIssue: newFir.ComplainantPlaceOfIssue,
            ComplainantAddress: newFir.ComplainantAddress,
            DetailsOfSuspected: newFir.DetailsOfSuspected,
            cadre: newFir.cadre,
            ReasonsforDelay: newFir.ReasonsforDelay,
            ParticularsOfPropertiesStolenInvolved: newFir.ParticularsOfPropertiesStolenInvolved,
        })
    }
    else {
        res.status(400).json({ "error": "Failed to create FIR" })
    }
})

const getFir = async (req, res) => {
    try {
        const FIRno = req.body
        const myFir = await Fir.findOne({ FIRno: FIRno.FIRno })
        console.log(myFir)
        res.status(201).json(myFir)
    } catch (error) {
        res.status(400).json(error)
    }

}




module.exports = { registerFir, getFir }