const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require("./src/routes/message");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9000;


app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);


const corsOptions = {
  origin: 'https://mnatorres.github.io',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://mnatorres.github.io');
    res.send("Bienvenidos a mi Api");
})



mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Estas conectado a MONGODB ATLAS"))
.catch((error) => console.error(error));



app.listen(PORT, () => console.log("El servidor se esta escuchando en el puerto", PORT));

module.exports = app;

