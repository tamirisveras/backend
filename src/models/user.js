const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchame = new mongoose.Schema({
    name: { 
        type: String,  
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    adress: [{
        city: String,
        street: String,
        district: String,
        number: String
    }],
    donor: { //Doador, se true quer dizer que esse usuário é doador, caso contrário é coletor
        type: Boolean, 
    },
    admin: { // Administrador do sistema, por padrão todos são false
        type: Boolean, 
    },
    active: { // Para fins de ativação e desativação da conta do usuário
        type: Boolean, 
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date
    }
})

userSchame.pre('save', async function (next){
    //Criptografi de senha do usuário antes de salvá-lo no banco de dados
    const user = this;
    if(user.isModified('password') || user.isNew){
        const encryptedPassword = await bcrypt.hash(user.password, 10)
        user.password = encryptedPassword
    }
    user.updated_at = new Date();
    next()
})

userSchame.methods.updateLastLogin = function () {
    //Função para atualizar os logs
    this.last_login = new Date();
    return this.save();
};

const User = mongoose.model('User', userSchame)

module.exports = User
