const express = require('express');
const router = express.Router();
const adminController = require('../../Controller/Admin Controller/adminProfileHeaderController');

// Route to get admin profile by ID
router.get('/:id', adminController.getAdminProfileById);

// router.put('/:id', adminController.updateAdmin);
router.put('/adminProfile/:id', adminController.updateAdminProfile);


module.exports = router;
