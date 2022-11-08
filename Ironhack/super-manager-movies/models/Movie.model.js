const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(


  {    search: String}
   

);

const MovieModel = model("Movie", movieSchema);

module.exports = MovieModel;
