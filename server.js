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
const { MongoClient } = require("mongodb");
const username = encodeURIComponent("<caiofernandocardoso6>");
const password = encodeURIComponent("<BaGHeEtMlFePRs6B>");
const cluster = "<cluster0>";
const authSource = "<authSource>";
const authMechanism = "<authMechanism>";
let uri =
  `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("<dbName>");
    const ratings = database.collection("<collName>");
    const cursor = ratings.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
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

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
