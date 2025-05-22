const db = require('../config/database');

module.exports = {
  async cadastrar(data) {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
    const values = [data.nome, data.email, data.senha];
    return db.query(query, values);
  },

}