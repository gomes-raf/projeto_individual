// routes/index.js
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');
const HomeController = require('../controllers/HomeController');
const CadastrarController = require('../controllers/CadastrarController');

function verificarLogin(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/agendamentos', verificarLogin, AgendamentoController.listarAgendamentos);
router.post('/agendamentos', verificarLogin, AgendamentoController.criarAgendamento);

// Rotas para o CRUD de login
router.get('/', (req, res) => {
  res.render('login'); // ou alguma página inicial
});

router.post('/criar-usuario', HomeController.criarUser);


router.get('/login', (req, res) => {
  res.render('login/index'); // renderiza a tela de login
});

router.post('/login', HomeController.loginUser); // novo método que você vai criar

router.get('/cadastrar', CadastrarController.index);
router.post('/cadastrar', CadastrarController.cadastrar);

// Rotas para o CRUD de agendamentos
router.post('/agendamentos', AgendamentoController.criarAgendamento);
router.get('/agendamentos', AgendamentoController.listarAgendamentos);
router.put('/agendamentos/:id', AgendamentoController.editarAgendamento);
router.delete('/agendamentos/:id', AgendamentoController.excluirAgendamento);


module.exports = router;