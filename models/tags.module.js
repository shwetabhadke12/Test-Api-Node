

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
 id:{
  type:String
 },
 selected:{
  type:Array
 },
  tags: [{
    tag: String,
    color: String
  }]
});

const Tagsmodel = mongoose.model("tags",schema);

module.exports = Tagsmodel;