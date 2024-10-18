// routes/adminRoutes.js
const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const {
  updateUserBalance,
  getUserById,
  getAllTrades,
  approveRejectKyc,
  getAllUsers,
  approveDeposit,
  rejectDeposit,
  approveWithdrawal,
  rejectWithdrawal,
  getPendingWithdrawals,
  getPendingDeposits,
  updateUserBalanceAndRole,
  updateUser,
  deleteUser
} = require('../controllers/adminController');

const router = express.Router();

router.put('/admin/:userId', authenticateToken, isAdmin, updateUserBalance);
router.put('/users/:id', authenticateToken, isAdmin, updateUser); // Update user
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser); // Delete user
router.get('/trades', authenticateToken, isAdmin, getAllTrades);
router.put('/kyc/:userId', authenticateToken, isAdmin, approveRejectKyc);
router.get('/users', authenticateToken, isAdmin, getAllUsers);
router.get('/users/:id', authenticateToken, isAdmin, getUserById);
router.put('/users/:userId', authenticateToken, isAdmin, updateUserBalanceAndRole);
router.get('/deposits/pending', authenticateToken, isAdmin, getPendingDeposits);
router.get('/withdrawals/pending', authenticateToken, isAdmin, getPendingWithdrawals);
router.put('/deposits/:depositId/approve', authenticateToken, isAdmin, approveDeposit);
router.delete('/deposits/:depositId/reject', authenticateToken, isAdmin, rejectDeposit);
router.put('/withdrawals/:withdrawalId/approve', authenticateToken, isAdmin, approveWithdrawal);
router.put('/withdrawals/:withdrawalId/reject', authenticateToken, isAdmin, rejectWithdrawal);

module.exports = router;
