const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donorSchema = new Schema({
    oil_situation: String,
    amount: String,
    date: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },// Id do usuário DOADOR
    status: Boolean,// Toda vez que um usuário coletar a doação esse atributo ficrá false.
});

const Donor = mongoose.model('Donor', donorSchema)

module.exports = Donor
