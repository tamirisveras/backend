const asyncHandler = require("express-async-handler")
const collectinModel = require("../../models/oilcollection")


const getAllCollections = asyncHandler(async (req, res) => {

    try{
        let collections = await collectinModel
        .find({status: false})
        .populate('user donor') // Popula os dados dos objetos relacionados (user e donor)
        .exec();
        return res.status(200).json(collections);
    } catch(e){
        return res.status(500).json({"mensagem":"Algo deu errado"})
    }
    
});

module.exports = getAllCollections