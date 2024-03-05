const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    image: {
        type:String
    }
}, {
    timestamps: true
});

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;
