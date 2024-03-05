const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    tab: {
        type: String
    },
    originalname: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    name:String,
    url:String
}, {
    timestamps: true
});

const AttachmentSchema = mongoose.model('Attachments', FormDataSchema);

module.exports = AttachmentSchema;
