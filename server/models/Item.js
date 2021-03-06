const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  itemPoster: {
    type: String,
    required: true,
    trim: true,
  },
  
  name: { type: String, required: true, trim: true },

  description: { type: String, required: true, trim: true },

  price: {type: Number, required: true, trim: true },

  category: {
    type: String,
    required: true,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  imgUrl: {
    type: String
  }


});


const Item = model("Item", itemSchema);
module.exports = Item;



//TO DO : ADD A DATE AND FORMAT IT 
