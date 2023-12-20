
const oilcollectionmodel = require("../../models/oilcollection")
const usermodel = require("../../models/user")

const oilcollectionController = {

    async OilCollectionCreate (req, res){
        const email = req.user['user']
        const body = req.body
        
        try{
            let user = await usermodel.findOne({email})
            body["user"] = user.id
            const newoilcollectionmodel = await oilcollectionmodel.create(body)
            res.status(201).json(newoilcollectionmodel)
        }catch(e){
            //Verficação se o email não pertence a um usuáio já cadastrado
            console.log(e)
        }
    }
}

module.exports = oilcollectionController