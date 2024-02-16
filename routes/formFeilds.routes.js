const express = require('express');
const router = express.Router();
const FormDataModel = require('../models/formFeilds.model');

// CREATE: POST route to create a new dynamic data document
// CREATE: POST route to create a new dynamic data document
router.post('/', async (req, res) => {
    try {
        const { organizationId, moduleId, image, sections } = req.body;

        const newData = {
            organizationId,
            moduleId,
            image,
            sections
        };
 
        const result = await FormDataModel.create(newData);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// READ: GET route to get all dynamic data documents
router.get('/', async (req, res) => {
    try {
        const data = await FormDataModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
router.get('/module/:moduleId', async (req, res) => {
    const { moduleId } = req.params;
    try {
        const data = await FormDataModel.find({ moduleId: moduleId }).populate('moduleId');
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// READ: GET route to get a dynamic data document by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await FormDataModel.findById(id);
        console.log(data,'adatatattat---------------')
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
// UPDATE: PUT route to update a dynamic data document by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { organizationId, moduleId, image, ...formFields } = req.body;
 
        const newData = {
            organizationId,
            moduleId,
            image,
            formFields // Assign the formFields to formFields
        };
 
        const updatedData = await FormDataModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json(updatedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
// DELETE: DELETE route to delete a dynamic data document by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await FormDataModel.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
module.exports = router;