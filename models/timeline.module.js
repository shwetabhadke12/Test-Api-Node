const mongoose = require('mongoose');

// Define the schema for each update
const updateSchema = new mongoose.Schema({
  tab:{
    type:String,
    required:true
  },
  action:{
    type:String,
    required:true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Define the schema for the document containing an array of updates
const documentSchema = new mongoose.Schema({
  id:{
    type:String
  },
  updates: [updateSchema] // Define updates as an array of updateSchema
});

// Define a model for the data
const Update = mongoose.model('Updatet', documentSchema);

module.exports = Update;
