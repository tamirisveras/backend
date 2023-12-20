const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oilcollectionSchema = new Schema({
    status: {type: Boolean}, // Atributo para validar se a coleta foi finalizada ou não.
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    donor: {type: Schema.Types.ObjectId, ref: 'Donor'},
    create_at: {
        type: Date,
        default: Date.now
    },
})


oilcollectionSchema.post('save', async function(doc, next) {
    // Após salvar um novo objeto OilCollection, atualize o status do doador para false
    try {
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
})

oilcollectionSchema.pre('deleteOne', {document: true}, async function (next) {
    // Antes de remover um objeto OilCollection, atualize o status do doador para true
    try {
        const donor = await mongoose.model('Donor').findByIdAndUpdate(
            this.donor,
            { $set: { status: true } },
            { new: true }
        )

        if (!donor) {
            console.error("Doador não encontrado.");
        }

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
})

const OilCollection = mongoose.model('OilCollection', oilcollectionSchema)

module.exports = OilCollection

