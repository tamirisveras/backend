
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../../models/user")

const refreshTOken = asyncHandler(async (req, res) =>{
    const {refreshToken} = req.body
    if(!refreshToken){
        return res.status(400).json({mensagem: "O refreshToken é obrigatório."})
    }
    let user 
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (e, decoded) => {
        if (e){
            if(e.expiredAt){
                return res.status(401).json({mensagem: "Tempo de 60 minutos expirado"})
            } else if(e.name === "JsonWebTokenError"){
                return res.status(400).json({mensagem: "Token inválido"})
            }
        }
        user = decoded.user
    })
    if (user){
        let email = user.user
        let userAuth = await User.findOne({ email })
        if (userAuth){
            accessToken = jwt.sign({
                user: {
                    user: userAuth.email,
                    id: userAuth.id
                }
            }, process.env.JWT_SECRET,
                {expiresIn: "60m"}
            )
            userAuth.updateLastLogin()
            return res.status(200).json({
                accessToken
            })
        }
    } else{
        return res.status(500).json({
            mensagem: "Algo deu errado"
        })
    }
})

module.exports = refreshTOken