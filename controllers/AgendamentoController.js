// controllers/AgendamentoController.js
const pool = require('../config/database');

// Criar uma nova Agendamento
exports.criarAgendamento = async (req, res) => {
  const { id_usuario, id_sala, tempo } = req.body;

  const query = 'INSERT INTO agendamentos (id_usuario, id_sala, tempo) VALUES ($1, $2, $3) RETURNING *';
  const values = [id_usuario, id_sala, tempo];

  try {
    const result = await pool.query(query, values);
    const Agendamento = result.rows[0];
    res.redirect('/agendamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as agendamentos
exports.listarAgendamentos = async (req, res) => {
  try {
    // Obter o id do usuário da sessão
    const loginId = req.session.userId;

    const query = `
    SELECT * FROM agendamentos
    JOIN usuarios ON agendamentos.id_usuario = usuarios.id
    JOIN salas ON agendamentos.id_sala = salas.id
    WHERE agendamentos.id_usuario = $1
    `;

    const result = await pool.query(query, [loginId]);
    res.render('agendamento/index', { agendamentos: result.rows });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma Agendamento
exports.editarAgendamento = async (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_sala, tempo} = req.body;

  const query = `
    UPDATE agendamentos SET id_usuario = $1, id_sala = $2, tempo = $3 
    WHERE id = $4 RETURNING *`;
  const values = [id_usuario, id_sala, tempo, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.redirect('/agendamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma Agendamento
exports.excluirAgendamento = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM agendamentos WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.redirect('/agendamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
