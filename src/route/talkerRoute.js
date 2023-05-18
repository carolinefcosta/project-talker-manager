const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const routerTalker = express.Router();

routerTalker.get('/', async (_req, res) => {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
  const result = JSON.parse(data);
  return res.status(200).send(result);
});

routerTalker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
  const result = JSON.parse(data);
  const findResult = result.find((element) => Number(element.id) === Number(id));
  if (findResult === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(findResult);
});

routerTalker.post('/', auth, validateName, validateAge, validateTalk,
validateWatchedAt, validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
  const result = JSON.parse(data);

  const newTalker = {
    id: result.length + 1,
    name,
    age,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };

  result.push(newTalker);
  const resultNewFile = JSON.stringify(result, null, 2);
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), resultNewFile);
  return res.status(201).json(newTalker);
});

routerTalker.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
  const result = JSON.parse(data);
  const filtered = result.filter((element) => Number(element.id) !== Number(id));

  await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(filtered));
  return res.status(204).end();
});

module.exports = routerTalker;