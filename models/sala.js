const db = require('../config/database');

module.exports = {
    async listarSalas() {
        const query = 'SELECT * FROM salas'
        const result = await db.query(query);
        return result.rows;
    },

    async selecionarSala() {
        const query = `
        INSERT INTO agendamentos (id_usuario, id_sala)
        VALUES ($1, $2)
        RETURNING *
        `;
        const values = [id_usuario, id_sala];
        return db.query(query, values);
    },

}