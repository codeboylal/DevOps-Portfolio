// const express = require('express');
// const { getAdminProfile, updateAdminProfile, saveAdminProfile } = require('../../Controller/Admin Controller/adminCompanyInfoController');

// const router = express.Router();

// // GET Admin profile by ID
// router.get('/:id', getAdminProfile);

// // PUT update Admin profile by ID
// router.put('/:id', updateAdminProfile);

// router.post('/:id', saveAdminProfile);
// // router.post('/:id', updateAdminProfile);



// module.exports = router;












const express = require('express');
const {getAdminCompanyProfile, updateAdminCompanyProfile} = require('../../Controller/Admin Controller/adminCompanyInfoController');

const router = express.Router();

// GET admin profile by ID
router.get('/:id', getAdminCompanyProfile);

// PUT update admin profile by ID
// router.put('/', updateCompanyProfile);\

router.put('/:id', updateAdminCompanyProfile);


module.exports = router;
