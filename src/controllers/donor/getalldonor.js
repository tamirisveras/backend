const asyncHandler = require("express-async-handler")
const usermodel = require("../../models/user")
const donormodel = require("../../models/donor")

const getAllDonor = asyncHandler(async (req, res) => {

    try{
        let donors = await donormodel.find({status: true})
        return res.status(200).json(donors);
    } catch(e){
        return res.status(500).json({"mensagem":"Algo deu errado"})
    }
    
});

module.exports = getAllDonor
