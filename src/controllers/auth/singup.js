const usermodel = require("../../models/user")


const UserController = {

    async createUser (req, res){
        const body = req.body
        try{
            const newUser = await usermodel.create(body)
            res.status(201).json(newUser)
        }catch(e){
            //Verficação se o email não pertence a um usuáio já cadastrado
            if (e.code === 11000){
                res.status(400).json({"mensagem": "E-mail já existente"})
            } else{
                res.status(500).json({"mensagem": e.mensagem})
            }
            
        }
    }
}

module.exports = UserController