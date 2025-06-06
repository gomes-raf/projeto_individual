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
  const isJson = req.headers['content-type'] === 'application/json';
  const id = req.method === 'GET' ? req.query.id : req.body.id;

  if (!id) {
    if (isJson) {
      return res.status(400).json({ success: false, message: 'ID da sala não fornecido' });
    }
    try {
      const result = await pool.query('SELECT * FROM salas');
      const salas = result.rows;
      return res.render('sala/index', { salas });
    } catch (err) {
      return res.status(500).send('Erro ao buscar salas: ' + err.message);
    }
  }

  const query = 'SELECT * FROM salas WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const sala = result.rows[0];

    if (!sala) {
      if (isJson) {
        return res.status(404).json({ success: false, message: 'Sala não encontrada' });
      }
      return res.status(404).send('Sala não encontrada');
    }

    req.session.salaId = sala.id;

    if (isJson) {
      return res.json({ success: true });
    } else {
      return res.redirect('/selecionar_horario');
    }

  } catch (err) {
    if (isJson) {
      return res.status(500).json({ success: false, message: err.message });
    } else {
      return res.status(500).send('Erro ao buscar sala: ' + err.message);
    }
  }
};
