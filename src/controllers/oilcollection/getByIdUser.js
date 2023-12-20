const asyncHandler = require("express-async-handler")
const usermodel = require("../../models/user")
const oilcollectionModel = require("../../models/oilcollection")

const getByIdUser = asyncHandler(async (req, res) => {

    email = req.user['user']
    try{
        let _user = await usermodel.findOne({email})
        let user = _user.id
        let donors = await oilcollectionModel.find({user})
        return res.status(200).json(donors);
    } catch(e){
        return res.status(500).json({"mensagem":"Algo deu errado"})
    }
    
});

module.exports = getByIdUser
