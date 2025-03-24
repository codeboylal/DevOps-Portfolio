// const multer = require('multer');
// const fs = require('fs');

// // Ensure 'uploads' directory exists
// const dir = './uploads';
// if (!fs.existsSync(dir)){
//   fs.mkdirSync(dir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;







// const multer = require('multer');
// const fs = require('fs');

// // Ensure 'uploads' directory exists
// const dir = './uploads';
// if (!fs.existsSync(dir)){
//   fs.mkdirSync(dir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
















const multer = require('multer');
const fs = require('fs');

// Ensure 'uploads' directory exists
const dir = './uploads';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

// Helper function to format date as DD-MM-YYYY
const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const currentDate = formatDate();
    const fileName = `${file.originalname.split('.')[0]}_${currentDate}.${file.originalname.split('.').pop()}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
