const express = require('express');
const router = express.Router();
const axios = require("axios");
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('a5744544657b8f40d3829259594d6e5a')

const { render } = require("ejs");


router.get('/movie', (req, res) => {
  
    axios.get("https://api.themoviedb.org/3/movie/550?api_key=a5744544657b8f40d3829259594d6e5a")
    .then(responseFromAPI => {
        // console.log(req.path);
        // console.log(responseFromAPI.data);
        res.render("mov/movie", { movies: responseFromAPI.data});
    })
    .catch(err => console.error(err))
});

router.get('/lists', (req, res) => {
    
    axios.get("https://api.themoviedb.org/3/list/8168597?api_key=a5744544657b8f40d3829259594d6e5a&language=en-US") 
    .then(listAPI => {
            
        res.render("mov/lists", {listAPI: listAPI.data.items});
    })
  .catch(err => console.error(err))   
});


//  get movie by ID 
router.get('/lists/:movieId', (req, res ) => {
   console.log(req.params.movieId)
   moviedb.movieInfo(req.params.movieId).then(
      function(movies) {
       
        //   console.log(data)
          res.render("mov/movie", {movies});
       
      },
      function(err) {console.error(err);});
  
    });



module.exports = router;

