const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

// Usar variáveis de ambiente do GitHub
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

app.use(cors());

// Rota para buscar herói
app.get('/api/hero/:name', async (req, res) => {
  const ts = Date.now();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${req.params.name}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro na API Marvel' });
  }
});

// Rota para quadrinhos (exemplo)
app.get('/api/comics/:heroId', async (req, res) => {
  const ts = Date.now();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  const url = `https://gateway.marvel.com/v1/public/characters/${req.params.heroId}/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro na API Marvel' });
  }
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));


