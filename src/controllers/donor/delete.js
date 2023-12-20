const asyncHandler = require("express-async-handler")
const modelDonor = require("../../models/donor")

const deleteDonor = asyncHandler(async (req, res) => {

    const objectId = req.params.id_donor
    try {
    
        const donorDelete = await modelDonor.findById(objectId)
        if(!donorDelete){
            return res.status(404).json({ message: 'Objeto não encontrado' });
        }else{
            if(!donorDelete.status){
                return res.status(400).json({ message: 'Doação não pode ser excluída pois há uma coleta agendada' });
            }else{
                await donorDelete.deleteOne();
                return res.status(200).json({ message: 'Objeto deletado com sucesso' });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar objeto' });
    }
})

module.exports = deleteDonor
