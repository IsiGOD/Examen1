const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar JSON en las solicitudes
app.use(bodyParser.json());

// Configurar la conexión a MongoDB
const uri = 'mongodb://db-service.db-juan:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

async function connectToDatabase() {
    try {
        await client.connect();
        const db = client.db('mydatabase');
        collection = db.collection('users');
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
}

connectToDatabase();

// Ruta para agregar un nuevo usuario
app.post('/api/users', async (req, res) => {
    try {
        const { name } = req.body;
        await collection.insertOne({ name });
        res.status(201).json({ message: 'Usuario agregado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        const users = await collection.find().toArray();
        const userNames = users.map(user => user.name);
        res.json({ users: userNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
