// models/UsuarioModel.js
const db = require('../config/database');

module.exports = {
  /**
   * Busca um usuário pelo email e senha.
   * @param {string} email - O email do usuário.
   * @param {string} senha - A senha do usuário.
   * @returns {Promise<object|undefined>} Retorna o objeto do usuário se encontrado, caso contrário, undefined.
   */
  async findByEmailAndPassword(email, senha) {
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
    const values = [email, senha];
    
    try {
      const result = await db.query(query, values);
      // Retorna a primeira linha encontrada, ou undefined se não houver resultados.
      return result.rows[0]; 
    } catch (err) {
      console.error('Erro ao buscar usuário no banco de dados:', err);
      // Lança o erro para que o controller possa tratá-lo.
      throw err;
    }
  },
};