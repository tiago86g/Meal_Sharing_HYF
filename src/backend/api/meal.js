const express = require('express');
const app = express();
const router = express.Router();
const knex = require('../database');

router.get('/:id', async (req, res) => {
  const mealById = await knex('meal')
    .select()
    .where('meal.id', parseInt(req.params.id));
  res.send(mealById);
});

module.exports = router;
