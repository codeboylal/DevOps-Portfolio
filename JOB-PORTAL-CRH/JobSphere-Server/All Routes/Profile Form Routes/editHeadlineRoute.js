// const express = require('express');
// const router = express.Router();
// const { updateHeadline } = require('../../Controller/Profile Controller/editHeadlineController');

// // Route to update headline
// // router.put('/headline', updateHeadline);
// router.put('/headline', updateHeadline);


// module.exports = router;









const express = require('express');
const router = express.Router();
const { updateHeadline, getHeadline } = require('../../Controller/Profile Controller/editHeadlineController');

// Route to update headline by profile ID
router.put('/headline/:id', updateHeadline);
router.get('/headline/:id', getHeadline);

module.exports = router;


