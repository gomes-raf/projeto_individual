 const pool = require('../config/database');

// Adicione este método se ele não existir
exports.listarHorarios = async (req, res) => {
  // Horários fixos
  const horarios = [
      { id: 1, tempo: "8h - 10h" },
      { id: 2, tempo: "10h - 12h" },
      { id: 3, tempo: "12h - 14h" },
      { id: 4, tempo: "14h - 16h" },
      { id: 5, tempo: "16h - 18h" }
  ];
  
  try {
    // Obter o ID da sala da sessão ou da query
    const salaId = req.session.salaId || req.query.salaId || req.body.salaId;
    
    if (salaId) {
      // Verificar quais horários já estão agendados para esta sala
      const query = `
        SELECT tempo FROM agendamentos 
        WHERE id_sala = $1
      `;
      const result = await pool.query(query, [salaId]);
      const horariosAgendados = result.rows.map(row => row.tempo);
      
      // Marcar os horários como disponíveis ou indisponíveis
      const horariosComDisponibilidade = horarios.map(h => ({
        ...h,
        disponivel: !horariosAgendados.includes(h.tempo)
      }));
      
      res.render('horario/index', { 
        horarios: horariosComDisponibilidade,
        salaId,
        todosIndisponiveis: horariosComDisponibilidade.every(h => !h.disponivel)
      });
    } else {
      res.render('horario/index', { 
        horarios,
        todosIndisponiveis: false
      });
    }
  } catch (err) {
    res.status(500).send('Erro ao listar horários: ' + err.message);
  }
};

exports.selecionarHorario = async (req, res) => {
  const id = req.method === 'GET' ? req.query.id : req.body.id;
  
  // Horários fixos
  const horarios = [
      { id: 1, tempo: "8h - 10h" },
      { id: 2, tempo: "10h - 12h" },
      { id: 3, tempo: "12h - 14h" },
      { id: 4, tempo: "14h - 16h" },
      { id: 5, tempo: "16h - 18h" }
  ];

  // Obter o ID da sala da sessão
  const salaId = req.session.salaId;
  
  if (!salaId) {
    return res.redirect('/selecionar_sala');
  }

  try {
    // Verificar quais horários já estão agendados para esta sala
    const query = `
      SELECT tempo FROM agendamentos 
      WHERE id_sala = $1
    `;
    const result = await pool.query(query, [salaId]);
    const horariosAgendados = result.rows.map(row => row.tempo);
    
    // Marcar os horários como disponíveis ou indisponíveis
    const horariosComDisponibilidade = horarios.map(h => ({
      ...h,
      disponivel: !horariosAgendados.includes(h.tempo)
    }));

    // Verificar se todos os horários estão indisponíveis
    const todosIndisponiveis = horariosComDisponibilidade.every(h => !h.disponivel);

    if (!id) {
      return res.render('horario/index', { 
        horarios: horariosComDisponibilidade,
        salaId,
        todosIndisponiveis
      });
    }

    // Se estamos processando uma reserva
    // Encontrar o horário selecionado pelo ID
    const horario = horariosComDisponibilidade.find(h => h.id == id);

    if (!horario) {
      return res.status(404).send('Horário não encontrado');
    }

    if (!horario.disponivel) {
      return res.status(400).send('Este horário não está disponível');
    }

    // Obter o ID do usuário da sessão
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).send('Usuário não autenticado');
    }

    // Criar o agendamento com o horário, sala e usuário selecionados
    const agendamentoQuery = `
      INSERT INTO agendamentos (id_usuario, id_sala, tempo)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const agendamentoValues = [userId, salaId, horario.tempo];
    
    await pool.query(agendamentoQuery, agendamentoValues);
    
    // Limpar o ID da sala da sessão após o agendamento
    delete req.session.salaId;
    
    // Redirecionar para a página de agendamentos
    return res.redirect('/seus_agendamentos');
  } catch (err) {
    return res.status(500).send('Erro ao processar agendamento: ' + err.message);
  }
}; 



