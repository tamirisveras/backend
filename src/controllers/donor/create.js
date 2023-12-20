const usermodel = require("../../models/user")
const donormodel = require("../../models/donor")


const donorController = {

    async createDonor (req, res){
        const email = req.user['user']
        const body = req.body
        try{
            let user = await usermodel.findOne({email})
            body["user"] = user.id
            const newDonorModel = await donormodel.create(body)
            res.status(201).json(newDonorModel)
        }catch(e){
            //Verficação se o email não pertence a um usuáio já cadastrado
            console.log(e)
        }
    }
}

module.exports = donorController