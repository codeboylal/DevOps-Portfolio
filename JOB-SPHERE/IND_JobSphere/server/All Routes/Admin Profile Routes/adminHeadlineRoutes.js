const express = require('express');
const router = express.Router();
const adminController = require('../../Controller/Admin Controller/adminHeadlinecontroller');

// Route to get admin headline by ID
router.get('/headline/:id', adminController.getAdminHeadline);

// Route to update admin headline by ID
router.put('/headline/:id', adminController.updateAdminHeadline);

module.exports = router;
