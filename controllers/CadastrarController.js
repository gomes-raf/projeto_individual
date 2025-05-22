const pool = require('../config/database');

// Lista de usuários cadastrados
exports.index = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    const usuarios = result.rows;
    res.render('cadastrar/index', { usuarios });
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários: ' + err.message);
  }
};

// Cadastro de novo usuário
exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;
  
  try {
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, senha]
    );
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar usuário: ' + err.message);
  }
};
