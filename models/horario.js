const db = require('../config/database');

module.exports = {
    async listarHorarios() {
        // Retornar horários fixos em vez de consultar o banco de dados
        return [
            { id: 1, tempo: "8h - 10h" },
            { id: 2, tempo: "10h - 12h" },
            { id: 3, tempo: "12h - 14h" },
            { id: 4, tempo: "14h - 16h" },
            { id: 5, tempo: "16h - 18h" }
        ];
    },

    async selecionarHorario(userId, salaId, tempo) {
        const query = `
        INSERT INTO agendamentos (id_usuario, id_sala, tempo)
        VALUES ($1, $2, $3)
        RETURNING *
        `;
        const values = [userId, salaId, tempo];
        return db.query(query, values);
    },
}
