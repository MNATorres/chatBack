const express = require("express");
const userSchema = require("../models/user");
const cors = require("cors");

const app = express();
app.use(cors());

const router = express.Router();

//create user
router.post("/user", (req, res) => {
  userSchema
    .create(req.body)
    .then((data) => res.json(data))
    .then(() => console.log("Se ha creado un usuario"))
    .catch((error) => res.json({ message: error }));
});

//read users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar todos los usuarios
router.delete("/users", (req, res) => {
  userSchema
    .deleteMany({}) // Elimina todos los documentos de usuarios
    .then(() => res.json({ message: "Todos los usuarios han sido eliminados" }))
    .catch((error) =>
      res.status(500).json({ message: "Error al eliminar usuarios" })
    );
});

module.exports = router;
