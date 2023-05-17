const express = require('express');

const fs = require('fs').promises;

const routerTalker = express.Router();

const path = require('path');

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

module.exports = routerTalker;