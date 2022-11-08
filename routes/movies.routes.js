<<<<<<< HEAD

=======
>>>>>>> 22e7e0d (Go one folder up)
const express = require("express");
const router = express.Router();
const movieModel = require("../models/Movie.model");
const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb("a5744544657b8f40d3829259594d6e5a");
const axios = require("axios");
require("ejs");

// / get popular Movies
router.get("/popular", (req, res) => {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?api_key=a5744544657b8f40d3829259594d6e5a"
    )
    .then((resFromAPI) => {
      console.log(resFromAPI.data);
      res.render("mov/popular", { popular: resFromAPI.data.results });
    })
    .catch((err) => console.error(err));
});

/// get all movies form list

router.get("/lists", (req, res) => {
  axios
    .get(
      "https://api.themoviedb.org/3/list/8168597?api_key=a5744544657b8f40d3829259594d6e5a&language=en-US"
    )
    .then((listAPI) => {
      res.render("mov/lists", { listAPI: listAPI.data.items });
    })
    .catch((err) => console.error(err));
});

/// 1. get Search with theMovieDB Templet/library on Node 
router.get("/lists/search", (req, res) => {
  console.log(req.query.search);
  moviedb
    .searchMovie({ query: req.query.search })
    .then((A) => {
      var data = A.results;

      res.render("mov/search", { data });
    })
    .catch((err) => console.error(err));
});
<<<<<<< HEAD
/// 2. get Search with Axios
// router.get("/lists/search", (req, res) => {
//   console.log(req.query.search)
//   // axios.get("https://api.themoviedb.org/3/search/movie?api_key=a5744544657b8f40d3829259594d6e5a&language=en-US&include_adult=false")
//   //   .then((searchMovie) => {
//   //         console.log(data)
//   //     res.render("mov/test", { data: searchMovie.data.results });
//       res.send("<h1>Hello</h1>")
//   //   })
//   //   .catch((err) => console.error(err));
// });
=======
>>>>>>> 22e7e0d (Go one folder up)



//  get movie by ID with MovieDB Templet/library on Node 

router.get("/lists/:movieId", (req, res) => {
<<<<<<< HEAD
  console.log(req.params.movieId);
=======
  // console.log(req.params.movieId);
>>>>>>> 22e7e0d (Go one folder up)
  moviedb.movieInfo(req.params.movieId).then(
    function (movies) {
      res.render("mov/movie", { movies });
    },
    function (err) {
      console.error(err);
    }
  );
});

// get similar movie 

router.get("/lists/:movieId/similar", (req, res) => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${req.params.movieId}/similar?api_key=a5744544657b8f40d3829259594d6e5a&language=en-US&page=1`)
    .then(
      function (similar) {
   
        res.render("mov/similar", { similar: similar.data.results });
      },
      function (err) {
        console.error(err);
      }
    );
});

module.exports = router;
