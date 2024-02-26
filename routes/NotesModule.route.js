const express = require('express');
const router = express.Router();
const SingleCompoent = require('../models/singlecomponentModule');
const multer = require('multer');
const path = require('path');
const AttachmentSchema = require('../models/attachments.model');
const mongoose = require('mongoose');
const PhotoUploding = require('../models/photo');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Use the original filename for uploaded files
  }
});
const upload = multer({ storage: storage });

router.post('/attachmnetpost', upload.single('attachmentfiles'), async (req, res) => {
  try {
   
    const { id, tab } = req.body;

   

    const newData = new AttachmentSchema({
      id,
      tab,
      originalname: req.file.originalname,
      filename:req.file.filename,
      path:req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      destination:req.file.destination
    });

    const result = await newData.save();

    res.status(201).json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/urlpostreq',upload.none(), async (req, res) => {
  try {

    const {id,tab,url,name} = req.body
   
    const newData = new AttachmentSchema({
      id,
      tab,
      name,
      url:JSON.parse(url)
    });

    const result = await newData.save();
    res.status(201).json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/cropimage', upload.none(), async (req, res) => {
  try {
    const { id, image } = req.body;
 

    const newData = new PhotoUploding({
      id,
      image 
    });

    await newData.save();

    res.status(201).json({ id,image });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





router.post('/noteplacement', upload.array('files', 10), async (req, res) => {
  try {
 
    const { id, title, note,tab } = req.body;

   
    const filesData = req.files.map(file => ({
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size
    }));


    const newData = new SingleCompoent({
      id,
      tab:tab,
      title,
      note,
      files: filesData 
    });

   
    const result = await newData.save();

    res.status(201).json(result); // Send the saved data back as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/noteplacement1/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SingleCompoent.find({ id: id ,tab:"notes"});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/attachmetfetchdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AttachmentSchema.find({ id:id});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/fetchdataid/:id',upload.none(),async (req, res) => {
  try {
    const { id } = req.params;
  
    const result = await AttachmentSchema.find({ _id:id});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/deleteNote/:id', async (req, res) => {
  try {
    const { id } = req.params;
  
    const result = await SingleCompoent.findByIdAndDelete({ _id: id ,tab:"notes"});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/deletephoto/:photoid', async (req, res) => {
  try {
    const { photoid } = req.params;
    const id = Number(photoid);
    const result = await PhotoUploding.deleteOne({ id: id });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  console.log(filePath);
  res.download(filePath, filename, err => {
    if (err) {
      console.error('Error downloading the file:', err);
    }
  });
});



router.delete('/deleteFiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await AttachmentSchema.findByIdAndDelete({ _id: id ,tab:"attachment"});
    res.status(201).json('hhbhbhb');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/deletefile/:editid1', async (req, res) => {
  try {
    const { editid1 } = req.params;
    const { editfiles } = req.body;

 
    if (!editid1 || !mongoose.Types.ObjectId.isValid(editid1)) {
      return res.status(400).json({ error: 'Valid document id (editid1) must be provided' });
    }


    if (!Array.isArray(editfiles)) {
      return res.status(400).json({ error: 'Editfiles should be provided as an array' });
    }

    let deletedCount = 0;

    for (const file of editfiles) {
      const { id, filename } = file;
      console.log(`Deleting file with id: ${id} from document with id: ${editid1}`);
      try {
        const result = await SingleCompoent.updateOne(
          { _id: editid1 },
          { $pull: { files: { _id: id } } }
        );
        // console.log(result);
        if (result.nModified > 0) {
          deletedCount++;
        }
      } catch (error) {
        console.error(`Error deleting file with id ${id}:`, error);
      
      }
    }

   
    if (deletedCount > 0) {
      console.log(`${deletedCount} file(s) deleted successfully`);
      res.status(200).json({ message: `${deletedCount} file(s) deleted successfully` });
    } else {
      console.log('No files found for deletion');
      res.status(200).json({ message: 'No files found for deletion' });
    }
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});














router.put('/updateNote/:id', upload.array('files'), async (req, res) => {
  try {
    const { id } = req.params; // Moved declaration of id here
    const { title, note } = req.body;
  
    const filesData = req.files.map(file => ({
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size
    })); 

    const existingDocument = await SingleCompoent.findById(id);

    if (!existingDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

   const updatedDocument = {
    ...existingDocument.toObject(),
    title:req.body.title || existingDocument.title,
    note:req.body.note || existingDocument.note,
    files:existingDocument.files.concat(filesData)
   }

    const result = await SingleCompoent.findByIdAndUpdate(
      id,
      updatedDocument,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json('asjbdjsabd');
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/editurlone/:id', upload.none(), async (req, res) => {
  try {
    const { id } = req.params; // Moved declaration of id here
    const { url, name } = req.body;
  
    const url1 = JSON.parse(url);
  

    const existingDocument = await AttachmentSchema.findById(id);

    if (!existingDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

   const updatedDocument = {
    
    url:url1 || existingDocument.url,
    name:req.body.name || existingDocument.name,
    
   }

    const result = await AttachmentSchema.findByIdAndUpdate(
      id,
      updatedDocument,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json('asjbdjsabd');
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;


