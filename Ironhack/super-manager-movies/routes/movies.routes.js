const express = require('express');
const router = express.Router();

const axios = require("axios");

const { render } = require("ejs");

/* GET movies  */
// router.get('/list-movies', (req, res, next) => {
  

// });
router.get('/list-movies', (req, res, next) => {
  
    axios.get("https://api.themoviedb.org/3/movie/550?api_key=a5744544657b8f40d3829259594d6e5a")
   
    .then(responseFromAPI => {
        console.log(req.path);
        console.log(responseFromAPI.data);
        res.render("mov/list-movies", { movies: responseFromAPI.data});
    })
    .catch(err => console.error(err))
});
module.exports = router;

// router.get('/list-movies/', (req, res, next) => {
//     axios.get("https://api.themoviedb.org/3/movie/550/images?api_key=a5744544657b8f40d3829259594d6e5a&language=en-US")

//     .then(api => {
//         console.log(api.data);
//         res.render("mov/list-movies", { images: api.data});
//     })
//     .catch(err => console.error(err))
// });
// module.exports = router;