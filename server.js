const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');

// Importar o middleware de autenticação
const authMiddleware = require('./middlewares/authMiddleware');

const indexRoutes = require('./routes/indexRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const comentarioRoutes = require('./routes/comentariosRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');

// Substitua <caiofernandocardoso6> e <Acpsmc531@> pelos valores reais do nome de usuário e senha
const username = encodeURIComponent("<caiofernandocardoso6>");
const password = encodeURIComponent("<Acpsmc531@>");
const cluster = "bunny-cluster.iy7o9mi.mongodb.net";
const dbName = "<nome-do-banco-de-dados>";
const collName = "<nome-da-colecao>";

const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=bunny-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    // Use database and collection
    const database = client.db(dbName);
    const collection = database.collection(collName);

    // Example: find all documents in a collection
    const cursor = collection.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', indexRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/auth', authRoutes);


// Página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Rota protegida para criar produto
app.get('/criar-produto', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'createProduct.html'));
});

// Rota protegida para comentários do produto
app.get('/produto/:id/comentarios', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'product_comments.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
