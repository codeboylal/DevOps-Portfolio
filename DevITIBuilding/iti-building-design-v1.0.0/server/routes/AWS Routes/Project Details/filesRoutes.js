// routes/fileRoutes.js
const express = require('express');
const { getFiles, downloadFile, previewFile } = require('../../../controllers/Aws Controller/Project Details Files/filesController');

const router = express.Router();

// Fetch all files from nested S3 folders
router.get("/files", getFiles);

// Generate download link for files inside a specific subfolder
// router.get("/download/:folder/:filename", downloadFile);
router.get("/download", downloadFile);


router.get("/preview", previewFile);
module.exports = router;
