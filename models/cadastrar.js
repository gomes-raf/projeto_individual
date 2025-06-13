const db = require('../config/database');

module.exports = {
  async cadastrar(data) {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
    const values = [data.nome, data.email, data.senha];
    return db.query(query, values);
  },

  async findAll() {
    try {
      const result = await db.query('SELECT id, nome, email FROM usuarios ORDER BY nome ASC'); 
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
};