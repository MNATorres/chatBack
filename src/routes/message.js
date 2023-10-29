const express = require("express");
const messageSchema = require("../models/message");

const app = express();

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

// Eliminar todos los mensajes
router.delete("/messages", (req, res) => {
  messageSchema
    .deleteMany({}) // Elimina todos los documentos de usuarios
    .then(() => res.json({ message: "Todos los mensajes han sido eliminados" }))
    .catch((error) =>
      res.status(500).json({ message: "Error al eliminar usuarios" })
    );
});

module.exports = router;
