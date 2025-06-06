// routes/index.js
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');
const HomeController = require('../controllers/HomeController');
const CadastrarController = require('../controllers/CadastrarController');
const salaController = require('../controllers/salaController');
const horarioController = require('../controllers/horarioController');

function verificarLogin(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/seus_agendamentos', verificarLogin, AgendamentoController.listarAgendamentos);
router.post('/seus_agendamentos', verificarLogin, AgendamentoController.criarAgendamento);

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
router.post('/seus_agendamentos', AgendamentoController.criarAgendamento);
router.get('/seus_agendamentos', AgendamentoController.listarAgendamentos);
router.put('/seus_agendamentos/:id', AgendamentoController.editarAgendamento);
router.delete('/seus_agendamentos/:id', AgendamentoController.excluirAgendamento);

router.get('/selecionar_sala', salaController.selecionarSala);
router.post('/selecionar_sala', salaController.selecionarSala);
router.get('/selecionar_salas', salaController.listarSalas);
router.post('/selecionar_salas', salaController.listarSalas);

router.get('/selecionar_horario', horarioController.selecionarHorario);
router.post('/selecionar_horario', horarioController.selecionarHorario);
router.get('/selecionar_horarios', horarioController.listarHorarios);
router.post('/selecionar_horarios', horarioController.listarHorarios);

module.exports = router;