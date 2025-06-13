// controllers/AgendamentoController.js
const AgendamentoModel = require('../models/agendamento');

// Listar todos os agendamentos do usuário logado
exports.listarAgendamentos = async (req, res) => {
  try {
    const loginId = req.session.userId;
    if (!loginId) {
      return res.redirect('/login'); // Garante que o usuário está logado
    }
    const agendamentos = await AgendamentoModel.findByUserId(loginId);
    res.render('agendamento/index', { agendamentos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo Agendamento
exports.criarAgendamento = async (req, res) => {
  try {
    // Adiciona o ID do usuário da sessão ao corpo da requisição para o model
    const dadosAgendamento = { ...req.body, id_usuario: req.session.userId };
    await AgendamentoModel.create(dadosAgendamento);
    res.redirect('/seus_agendamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um Agendamento
exports.excluirAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const agendamentoExcluido = await AgendamentoModel.delete(id);

    if (!agendamentoExcluido) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.redirect('/seus_agendamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};