const asyncHandler = require("express-async-handler")
const OilCollection = require("../../models/oilcollection")

const deleteOilCollection = asyncHandler(async (req, res) => {

    const objectId = req.params.id
    try {
    
        const oilCollection = await OilCollection.findById(objectId);

        if (!oilCollection) {
            return res.status(404).json({ error: 'Coleta não encontrada' });
        }

        // Removendo o objeto OilCollection e acionando os hooks
        await oilCollection.deleteOne();

        return res.status(200).json({ message: 'Objeto deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar objeto' });
    }
})

module.exports = deleteOilCollection
