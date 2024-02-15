const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    organizationId: {
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true,
        ref: 'CreatFormsSchema'
    },
    image: {
        type: String,
    },
    sections: [
        {
            sectionName: {
                type: String,
                required: true
            },
            fields: {
                type: Map,
                of: String
            }
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

const FormDataModel = mongoose.model('FormData', FormDataSchema);

module.exports = FormDataModel;
