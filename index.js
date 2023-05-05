const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 9000;

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Estás conectado a MongoDB Atlas"))
.catch((error) => console.error(error));

// Definición del modelo de mensaje
const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  timestamp: String,
});

const Message = mongoose.model('Message', messageSchema);

// Definición del esquema de GraphQL
const schema = buildSchema(`
  type Message {
    id: ID!
    from: String!
    to: String!
    message: String!
    timestamp: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    createMessage(from: String!, to: String!, message: String!, timestamp: String!): Message!
  }
`);

// Implementación de las resolvers
const rootValue = {
  messages: async () => {
    const messages = await Message.find();
    return messages;
  },
  createMessage: async ({ from, to, message, timestamp }) => {
    const newMessage = new Message({ from, to, message, timestamp });
    await newMessage.save();
    return newMessage;
  },
};

// Configuración de Express
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}/graphql`);
});
