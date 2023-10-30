const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const messageRoutes = require("./src/routes/message");
const userRoutes = require("./src/routes/user");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9000;

const corsOptions = {
  origin: ["https://main--luminous-jelly-479ac5.netlify.app", "http://localhost:5173", "https://gbsh2x1h-5173.brs.devtunnels.ms/"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", messageRoutes);
app.use("/api", userRoutes);

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi Api");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Estas conectado a MONGODB ATLAS"))
  .catch((error) => console.error(error));

app.listen(PORT, () =>
  console.log("El servidor se esta escuchando en el puerto", PORT)
);

module.exports = app;
