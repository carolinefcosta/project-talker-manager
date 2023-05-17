const express = require('express');

const fs = require('fs').promises;

const router = express.Router();

const path = require('path');

router.get('/', async (req,res) => {
  const data = await fs.readFile(path.resolve(__dirname,'../talker.json'), 'utf-8');
  const result = JSON.parse(data);
  return res.status(200).send(result);
});

module.exports = router;