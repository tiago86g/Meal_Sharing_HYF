const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  console.log(req.query);

  try {
    const {
      maxPrice,
      availableReservations,
      title,
      createdAfter,
      limit
    } = req.query;
    if (
      !maxPrice &&
      !availableReservations &&
      !title &&
      !createdAfter &&
      !limit
    ) {
      const meals = await knex('meal');
      res.json(meals);
    } else if (maxPrice) {
      const meals = await knex('meal').where('price', '<', maxPrice);
      res.send(meals);
    } else if (title) {
      const meals = await knex('meal').where('title', 'like', `%${title}%`);
      res.send(meals);
    } else if (availableReservations == 'true') {
      meals = await knex('Meal')
        .select(
          knex.raw(
            `Meal.id, Meal.title, Meal.max_reservations, SUM(reservation.number_of_guests) AS total_guests`
          )
        )
        .innerJoin('reservation', 'meal.id', 'reservation.meal_id')
        .groupBy('Meal.id')
        .having(knex.raw(`total_guests < Meal.max_reservations`))
        .catch(e => {
          console.error(e);
        });
      res.send(meals);
    } else if (createdAfter) {
      const createdAfterDate = new Date(createdAfter);
      const meals = await knex('meal').where(
        'created_date',
        '>',
        createdAfterDate
      );
      console.log(meals);

      res.send(meals);
    } else if (limit) {
      const meals = await knex('meal').limit(limit);
      res.send(meals);
    }
  } catch (error) {}
});

router.get('/:id', async (req, res) => {
  const mealById = await knex('meal')
    .select()
    .where('meal.id', parseInt(req.params.id));
  res.json(mealById);
});

router.post('/', async (req, res) => {
  const newMeal = ({
    title,
    description,
    price,
    max_reservations,
    when,
    location,
    created_date
  } = req.body);
  await knex('meal').insert(newMeal);

  const meals = await knex('meal');
  res.json(meals);
});

router.put('/:id', async (req, res) => {
  await knex('meal')
    .where({ id: req.params.id })
    .update({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      max_reservations: req.body.max_reservations,
      when: req.body.when,
      location: req.body.location
    });
  res.send(req.params.id);
});

router.delete('/:id', async (req, res) => {
  await knex('meal')
    .where('meal.id', req.params.id)
    .del();
  res.json(req.params.id);
});

module.exports = router;
