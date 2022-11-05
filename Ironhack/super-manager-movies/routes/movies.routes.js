const express = require('express');
const router = express.Router();
const tmdb = require('tmdbv3').init("a5744544657b8f40d3829259594d6e5a");
const axios = require("axios");


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

router.get('/col', (req, res) => {
    
    axios.get("https://api.themoviedb.org/3/movie/550/lists?api_key=a5744544657b8f40d3829259594d6e5a&language=en-US") 
    .then(a => {
            console.log(a.data)
        res.send("<h1>Hello</h1>");
    })
  .catch(err => console.error(err))   
});

module.exports = router;

