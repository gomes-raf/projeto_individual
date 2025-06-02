// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();
const port = 3000;

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'vaiCorinthians',
  resave: false,
  saveUninitialized: false
}));

// Usando as rotas definidas
app.use(routes);

// Configurar para servir arquivos estáticos da pasta views
app.use(express.static(path.join(__dirname, 'views')));

// Configuração adicional para servir arquivos estáticos de assets
app.use('/assets', express.static('assets'));

// Rota raiz
app.get('/', (req, res) => {
    res.send('Página inicial!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`) // Output remains in Portuguese
);
