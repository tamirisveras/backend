const {Router} = require("express")
// Importações
// User
const userController = require('../controllers/auth/singup')
const sigInUser = require("../controllers/auth/singInUser")
const refreshTOken = require("../controllers/auth/refrashAccessToken")
const getUser = require("../controllers/auth/getUser")
const validToken = require("../middleware/auth/validateToken")

// Donor
const createDonor = require("../controllers/donor/create")
const getDonor = require("../controllers/donor/getdonor")
const getAllDonor = require("../controllers/donor/getalldonor")
const getByIdDonor = require("../controllers/oilcollection/getByIdDonor")
const deleteDonor = require("../controllers/donor/delete")

// oilCollection
const oilcollectionController = require("../controllers/oilcollection/create")
const getByIdUser = require("../controllers/oilcollection/getByIdUser")
const deleteOilCollection = require("../controllers/oilcollection/delete")
const finishOilCollection = require("../controllers/oilcollection/finishCollection")
const getAllCollections = require("../controllers/oilcollection/getCollectionsActive")

const routes = Router()


routes.get('/', (req, res)=>{
    res.send('Hello World.')
})

// Criando Rotas
// Auth
routes.post('/create-user', userController.createUser)
routes.post('/login-user', sigInUser)
routes.post('/refresh', refreshTOken)
routes.get('/get-user', validToken, getUser)

// Donor
routes.post('/create-donor', validToken, createDonor.createDonor)
routes.get('/get-donors', validToken, getDonor) 
routes.get('/get-all-donors', validToken, getAllDonor)
routes.get('/get-donor-id/:id_donor', validToken, getByIdDonor)
routes.delete('/delete-donor/:id_donor', validToken, deleteDonor)

// OilCollection
routes.post("/oilcollection", validToken, oilcollectionController.OilCollectionCreate)
routes.get("/get-colections", validToken, getByIdUser)
routes.delete("/delete/oilcollection/:id", validToken, deleteOilCollection)
routes.put("/oilcollection/:id/status", validToken, finishOilCollection)
routes.get("/get-colections-active", validToken, getAllCollections)

module.exports = routes