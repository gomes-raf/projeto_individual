// models/AgendamentoModel.js
const db = require('../config/database');

module.exports = {

  async create({ id_usuario, id_sala, tempo }) {
    const query = 'INSERT INTO agendamentos (id_usuario, id_sala, tempo) VALUES ($1, $2, $3) RETURNING *';
    const values = [id_usuario, id_sala, tempo];
    const result = await db.query(query, values);
    return result.rows[0];
  },


  async findByUserId(userId) {
    const query = `
      SELECT 
        agendamentos.id, 
        agendamentos.tempo, 
        usuarios.nome AS nome_usuario, 
        salas.nome AS nome_sala 
      FROM agendamentos
      JOIN usuarios ON agendamentos.id_usuario = usuarios.id
      JOIN salas ON agendamentos.id_sala = salas.id
      WHERE agendamentos.id_usuario = $1
      ORDER BY agendamentos.tempo DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  },


  async update(id, { id_usuario, id_sala, tempo }) {
    const query = `
      UPDATE agendamentos 
      SET id_usuario = $1, id_sala = $2, tempo = $3 
      WHERE id = $4 
      RETURNING *`;
    const values = [id_usuario, id_sala, tempo, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },


  async delete(id) {
    const query = 'DELETE FROM agendamentos WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  }
};