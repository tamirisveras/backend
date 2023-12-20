const asyncHandler = require("express-async-handler")
const OilCollection = require("../../models/oilcollection")

const finishOilCollection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try{
        const updatedCollection = await OilCollection.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Coleta não encontrada' });
        }
        res.status(200).json(updatedCollection);
    }catch(e){
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
})

module.exports = finishOilCollection
