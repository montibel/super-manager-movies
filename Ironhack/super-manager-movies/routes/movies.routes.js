const express = require('express');
const router = express.Router();

const axios = require("axios");
var url = require('url');

const { render } = require("ejs");

/* GET movies  */
// router.get('/list-movies', (req, res, next) => {
  

// });
router.get('/movie', (req, res, next) => {
  
    axios.get("https://api.themoviedb.org/3/movie/550?api_key=a5744544657b8f40d3829259594d6e5a")
    .then(responseFromAPI => {
        console.log(req.path);
        console.log(responseFromAPI.data);
        res.render("mov/movie", { movies: responseFromAPI.data});
    })
    .catch(err => console.error(err))
});
module.exports = router;

