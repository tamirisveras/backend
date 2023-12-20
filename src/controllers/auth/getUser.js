const asyncHandler = require("express-async-handler")
const User = require("../../models/user")

const getUser = asyncHandler(async (req, res) => {

    email = req.user['user']
    let user = await User.findOne({email})

    if (!user || (!user.active)){
        return res.status(404).json({"mensgame": "Usuário não encontrado"})
    }
    user = user.toObject()
    delete user.password
    return res.status(200).json(user);
});

module.exports = getUser
