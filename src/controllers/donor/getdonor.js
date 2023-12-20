const asyncHandler = require("express-async-handler")
const usermodel = require("../../models/user")
const donormodel = require("../../models/donor")

const getDonor = asyncHandler(async (req, res) => {

    email = req.user['user']
    try{
        let _user = await usermodel.findOne({email})
        let user = _user.id
        let donors = await donormodel.find({user})
        return res.status(200).json(donors);
    } catch(e){
        return res.status(500).json({"mensagem":"Algo deu errado"})
    }
    
});

module.exports = getDonor
