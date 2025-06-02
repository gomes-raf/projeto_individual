const pool = require('../config/database');

exports.listarSalas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM salas');
        const salas = result.rows;
        res.render('sala/index', { salas });
    } catch (err) {
        res.status(500).send('Erro ao buscar salas: ' + err.message);
    }
};

exports.selecionarSala = async (req, res) => {
    // Verificar se é uma requisição GET ou POST
    const id = req.method === 'GET' ? req.query.id : req.body.id;
    
    // Se não houver ID, listar todas as salas
    if (!id) {
      try {
        const result = await pool.query('SELECT * FROM salas');
        const salas = result.rows;
        return res.render('sala/index', { salas });
      } catch (err) {
        return res.status(500).send('Erro ao buscar salas: ' + err.message);
      }
    }
  
    // Se houver ID, buscar sala específica
    const query = 'SELECT * FROM salas WHERE id = $1';
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      const sala = result.rows[0];
      
      if (!sala) {
        return res.status(404).send('Sala não encontrada');
      }
      
      res.render('sala/index', { sala });
    } catch (err) {
      res.status(500).send('Erro ao buscar sala: ' + err.message);
    }
};
