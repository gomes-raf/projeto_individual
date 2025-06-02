// controllers/HomeController.js
const pool = require('../config/database');

// Criar uma nova Agendamento
exports.criarUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
  const values = [nome, email, senha];

  try {
    const result = await pool.query(query, values);
    const Login = result.rows[0];
    res.redirect('/seus_agendamentos');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
  const values = [email, senha];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (user) {
      req.session.userId = user.id;
      res.redirect('/seus_agendamentos');
    } else {
      res.send('Email ou senha inválidos.');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
