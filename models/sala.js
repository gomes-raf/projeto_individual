// models/sala.js
const db = require('../config/database');

module.exports = {
    
  async findAll() {
    const result = await db.query('SELECT * FROM salas ORDER BY nome ASC');
    return result.rows;
  },

  async findById(id) {
    const query = 'SELECT * FROM salas WHERE id = $1';
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  }
};