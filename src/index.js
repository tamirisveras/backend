const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routers/index")
const cors = require("cors")
require("dotenv").config()

const app = express();
app.use(express.json())
app.use(cors())
app.use(routes) 

const PORT = process.env.PORT

mongoose.connect(
    process.env.DATABASE_URL, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`)
})


