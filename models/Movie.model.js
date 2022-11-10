const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(


  {    rating: {type:String},
       tmbd_id: {type:String},
       createdby:{type: Schema.Types.ObjectId, ref:"User"}
  
  }
   

);

const MovieModel = model("Movie", movieSchema);

module.exports = MovieModel;
