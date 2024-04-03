var express = require('express');
var router = express.Router();

// NOTE: we can now store the api inside of the .env file
const API_KEY = process.env.API_KEY;
const URL = 'https://www.omdbapi.com/?apikey=' + API_KEY + '&t=';

// This app has no "home" page, but your projects should 😀
router.get('/', function(req, res, next) {
  res.redirect('/movies');
});

router.get('/movie-search', function(req, res) {
  res.render('movie-search', {title: 'Movie Search'});
});

router.get('/get-movie', async function(req, res) {
  // 1) retrieve the movie search query param from req.query
  const movieSearchTerm = req.query.t
  // 2) make the api call to OMDB
  const response = await fetch(URL + movieSearchTerm);
  const data = await response.json();
  // Do some mongoDB stuff with mongoose right here!
  // 3) send an http response w/JSON data to the movie page
  res.json(data);
});

module.exports = router;
