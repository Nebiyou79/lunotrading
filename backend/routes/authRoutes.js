// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { register, login, createAdmin, getUsers, editUser, deleteUser } = require('../controllers/authController');
const { updateUserBalance } = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.post('/create-admin', createAdmin);
router.put('/users/:userId', authenticateToken, isAdmin, updateUserBalance); 
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);
router.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });

module.exports = router;
