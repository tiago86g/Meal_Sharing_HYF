const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  const reservations = await knex('reservation');
  res.json(reservations);
});

router.get('/:id', async (req, res) => {
  const reservationById = await knex('reservation')
    .select()
    .where('reservation.id', parseInt(req.params.id));
  res.send(reservationById);
});

router.post('/', async (req, res) => {
  const newReservation = ({
    number_of_guests,
    meal_id,
    created_date
  } = req.body);
  await knex('reservation').insert(newReservation);
  res.send(newReservation);
});

router.put('/:id', async (req, res) => {
  const updatedReservation = ({
    number_of_guests,
    meal_id,
    created_date
  } = req.body);
  await knex('reservation')
    .where({ id: req.params.id })
    .update(updatedReservation);
  res.send(updatedReservation);
});

router.delete('/:id', async (req, res) => {
  await knex('reservation')
    .where('reservation.id', parseInt(req.params.id))
    .del();
  res.json(req.params.id);
});
module.exports = router;
