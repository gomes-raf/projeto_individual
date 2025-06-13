// controllers/salaController.js
const SalaModel = require('../models/sala');

exports.listarSalas = async (req, res) => {
  try {
    // 1. Pede ao Model para buscar os dados
    const salas = await SalaModel.findAll();
    // 2. Renderiza a view com os dados recebidos
    res.render('sala/index', { salas });
  } catch (err) {
    res.status(500).send('Erro ao buscar salas: ' + err.message);
  }
};

exports.selecionarSala = async (req, res) => {
  const isJson = req.headers['content-type'] === 'application/json';
  const id = req.method === 'GET' ? req.query.id : req.body.id;

  // Se nenhum ID for fornecido...
  if (!id) {
    if (isJson) {
      return res.status(400).json({ success: false, message: 'ID da sala não fornecido' });
    }
    // Se for uma requisição web normal, simplesmente renderiza a página de seleção novamente.
    try {
      const salas = await SalaModel.findAll();
      return res.render('sala/index', { salas, error: 'Por favor, selecione uma sala.' });
    } catch (err) {
      return res.status(500).send('Erro ao buscar salas: ' + err.message);
    }
  }

  // Se um ID foi fornecido...
  try {
    const sala = await SalaModel.findById(id);

    if (!sala) {
      const message = 'Sala não encontrada';
      if (isJson) {
        return res.status(404).json({ success: false, message });
      }
      return res.status(404).send(message);
    }

    // Lógica de sessão e resposta continuam no controller
    req.session.salaId = sala.id;

    if (isJson) {
      return res.json({ success: true, message: 'Sala selecionada com sucesso' });
    } else {
      return res.redirect('/selecionar_horario');
    }

  } catch (err) {
    const message = 'Erro ao buscar sala: ' + err.message;
    if (isJson) {
      return res.status(500).json({ success: false, message });
    } else {
      return res.status(500).send(message);
    }
  }
};