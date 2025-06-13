// controllers/LoginController.js
const UsuarioModel = require('../models/login');

exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Chama o Model para fazer a busca no banco de dados.
    const user = await UsuarioModel.findByEmailAndPassword(email, senha);

    // 2. Com base na resposta do Model, o controller toma a decisão.
    if (user) {
      // Lógica de SESSÃO e RESPOSTA HTTP pertence ao controller.
      req.session.userId = user.id; // Ou user.usuario_id, dependendo do nome da sua coluna
      res.redirect('/seus_agendamentos');
    } else {
      // Envia uma resposta de falha. Status 401 (Unauthorized) é mais apropriado aqui.
      res.status(401).send('Email ou senha inválidos.');
    }
  } catch (err) {
    // Trata erros que possam ter ocorrido na chamada do model ou em outra parte.
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
};