const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const mealsRouter = require('./api/meals');
const reviewsRouter = require('./api/reviews');
const reservationsRouter = require('./api/reservations');

const port = process.env.DB_PORT || 4000;

// For week4 no need to look into this!
// Serve the built client html
const buildPath = path.join(__dirname, './../frontend');
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use('/meals', mealsRouter);
router.use('/reviews', reviewsRouter);
router.use('/reservations', reservationsRouter);

app.use('/api', router);

// For week4 no need to look into this!
// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './../frontend/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
