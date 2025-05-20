// routes/index.js
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

// Rotas para o CRUD de agendamentos
router.post('/agendamentos', AgendamentoController.criarAgendamento);
router.get('/agendamentos', AgendamentoController.listarAgendamentos);
router.put('/agendamentos/:id', AgendamentoController.editarAgendamento);
router.delete('/agendamentos/:id', AgendamentoController.excluirAgendamento);

module.exports = router;