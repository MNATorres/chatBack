const express = require("express");
const messageSchema = require("../models/message");
const cors = require('cors');

const app = express();
app.use(cors());

const router = express.Router();


//crear mensaje
router.post("/message", (req, res) => {
  messageSchema
    .create(req.body)
    .then((data) => res.json(data))
    .then(() => console.log("Se ha creado un mensaje"))
    .catch((error) => res.json({ message: error }));
});

//read products
router.get("/messages", (req, res) => {
  messageSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//mi nombre es Matias Torres
//por que veo los cambios??

module.exports = router;
