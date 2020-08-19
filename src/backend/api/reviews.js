const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  const reviews = await knex('review');
  res.json(reviews);
});

router.get('/:id', async (req, res) => {
  const reviewsById = await knex('review')
    .select()
    .where('review.id', parseInt(req.params.id));
  res.json(reviewsById);
});

router.post('/', async (req, res) => {
  const newReview = ({
    title,
    description,
    review_meal_id,
    stars,
    created_date
  } = req.body);
  await knex('review').insert(newReview);
  res.send(newReview);
});

router.put('/:id', async (req, res) => {
  console.log(req.params.id);

  const updatedReview = ({
    title,
    description,
    review_meal_id,
    stars,
    created_date
  } = req.body);
  await knex('review')
    .where({ id: req.params.id })
    .update(updatedReview);
  res.send(req.params.id);
});

router.delete('/:id', async (req, res) => {
  await knex('review')
    .where('review.id', parseInt(req.params.id))
    .del();
  res.json(req.params.id);
});

module.exports = router;
