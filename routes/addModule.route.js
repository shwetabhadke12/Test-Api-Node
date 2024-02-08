// routes/mainLayoutRoutes.js
const express = require('express');
const router = express.Router();
const MainLayoutModel = require('../models/addModule.model');

// Create a new document
router.post('/', async (req, res) => {
    console.log(req.body,'hitted')
  try {
    const newDocument = await MainLayoutModel.create(req.body);
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await MainLayoutModel.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await MainLayoutModel.findById(req.params.id);
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a document by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDocument = await MainLayoutModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedDocument) {
      res.json(updatedDocument);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a document by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDocument = await MainLayoutModel.findByIdAndDelete(req.params.id);
    if (deletedDocument) {
      res.json({ message: 'Document deleted' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
