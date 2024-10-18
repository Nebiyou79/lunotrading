const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getKYCRequests, approveKYC, rejectKYC, submitKYC } = require('../controllers/kycController'); // Adjust path if necessary

// Configure Multer to store files in a specific folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});
 
const upload = multer({ storage: storage });

router.get('/', getKYCRequests);
// KYC Submit Route
router.post('/submit', upload.single('kycDocument'), submitKYC);
router.put('/approve/:id', approveKYC);
router.put('/reject/:id', rejectKYC);

module.exports = router;