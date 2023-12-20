const asyncHandler = require("express-async-handler")
const donormodel = require("../../models/donor")

const getByIdDonor = asyncHandler(async (req, res) => {

    let objectId = req.params.id_donor
    try{
        let donor = await donormodel.findById(objectId)
        return res.status(200).json(donor);
    } catch(e){
        return res.status(500).json({"mensagem":"Algo deu errado"})
    }
    
});

module.exports = getByIdDonor
