# Models do projeto


## User
Esse model será utilizado para determinar quem serão usuários do sistema, pois terão dados de autenticação e dados de nível de usuário. Veja abaixo o Schema do model `User`.

~~~ js
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
    last_login: { // Este atributo será sempre usado para ver a frequência de login do usuário
        type: Date
    }
})

userSchame.pre('save', async function (next){// Função de criptografar a senha do usuário
    // Essa função será executada sempre antes de salvar o objeto banco de dados
    const user = this;
    if(user.isModified('password') || user.isNew){ 
        // Se somente o campo password tiver sendo alterado ele entra na condição para ser criptografado
        const encryptedPassword = await bcrypt.hash(user.password, 10)
        user.password = encryptedPassword
    }
    user.updated_at = new Date();
    next()
})

userSchame.methods.updateLastLogin = function () {
    // Função para atualizar a última data de login do usuário
    this.last_login = new Date();
    return this.save();
};

const User = mongoose.model('User', userSchame)

module.exports = User

~~~

## Donor

Esse model é destinado aos dados refrentes as doações de óleo, nesse model haverá atributos destinados a relacionamentos com outros models. Veja a estrututra do deguinte model.

~~~ js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donorSchema = new Schema({
    oil_situation: String, // Situação do óleo a ser doado
    amount: String, // Quantidade de óleo, pode-se definir que essa será a quantidade em litros por exemplo
    date: Date, // Data para a retirada do óleo doado.
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Relacionamento com o model User.
    status: Boolean,// Toda vez que um usuário coletar a doação esse atributo ficrá false.
});

const Donor = mongoose.model('Donor', donorSchema)

module.exports = Donor

~~~

O atributo `user` será usado para relacionar um usuário Doador a doação, ou seja, quem foi que realizou a doação desse óleo.

## OilCollection

Esse model é destinado as coltas de óleo realizadas por usuários COLETORES. Para isso será necessário um relacionamento tanto com o model `Donor` para identificar qual a doação o usuário está coletando quanto o com o model `User` sendo para identificar qual o usuário COLETOR está realizando a coleta. Veja a estrutura abaixo:

~~~ js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oilcollectionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Id do usuário coletor
    donor: {type: Schema.Types.ObjectId, ref: 'Donor'} // Id do objeto do model Donor(doação)
})


// Sempre que uma doação for coletada é necessário desativar o seu status de disponível para indisponíel
oilcollectionSchema.post('save', async function(doc, next) {
    // Após salvar um novo objeto OilCollection, atualize o status do doador para false
    try {
        // Busca da doação para a alteração.
        const donor = await mongoose.model('Donor').findByIdAndUpdate(
            doc.donor,
            { $set: { status: false } },
            { new: true }
        );

        if (!donor) {
            console.error("Doador não encontrado.");
        }

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
});

const OilCollection = mongoose.model('OilCollection', oilcollectionSchema)

module.exports = OilCollection


~~~

