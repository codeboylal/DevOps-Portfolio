const express = require('express');
const router = express.Router();
const multer = require('../../Middleware/multerMiddleware'); // Multer configuration for file uploads
const resumeController = require('../../Controller/Profile Controller/resumeController');


// router.post('/upload', multer.single('resume'), resumeController.uploadResume);
router.put('/upload', multer.single('resume'), resumeController.uploadResume);


router.get('/:email', resumeController.getResumes);

router.delete('/:id', resumeController.deleteResume); // New route for deleting a resume by its ID

router.get('/download/:id', resumeController.downloadResume);

  

module.exports = router;
