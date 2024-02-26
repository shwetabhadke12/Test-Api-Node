const mongoose = require('mongoose');



const FileSchema = new mongoose.Schema({
    
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
});


const FormDataSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    tab:{
        type:String
    },
    title: {
        type: String
    },
    note: {
        type: String
    },
    files: [FileSchema] ,
 
    
}, {
    timestamps: true
});

const SingleCompoent = mongoose.model('SingleView', FormDataSchema);

module.exports = SingleCompoent;
