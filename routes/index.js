const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.send('Projeto rodando localmente!');
});

module.exports = router;

//IMPORTANTE: MUDAR POSTERIORMENTE
