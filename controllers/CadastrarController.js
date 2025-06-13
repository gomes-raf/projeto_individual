const cadastrarModel = require('../models/cadastrar');

module.exports = {
  async index(req, res) {
    try {
      const usuarios = await cadastrarModel.findAll();
      res.render('cadastrar/index', { usuarios }); 
    } catch (err) {
      res.status(500).send('Erro ao buscar usuários: ' + err.message);
    }
  },

  async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      await cadastrarModel.cadastrar({ nome, email, senha });
      res.redirect('/login'); 
    } catch (err) {
      res.status(500).send('Erro ao cadastrar usuário: ' + err.message);
    }
  }
};