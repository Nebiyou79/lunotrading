const KYC = require('../models/KYC');
const User = require('../models/User'); // Import your User model

// Client submits KYC
const submitKYC = async (req, res) => {
  try {
    const { userId, name, email } = req.body;
    const kycDocuments = req.file; // For a single file
    if (!userId || !name || !email || !kycDocuments) {
      return res.status(400).json({
        message: 'userId, name, email, and at least one kycDocument are required.',
      });
    }
    const kycDocPath = kycDocuments.path; // For a single file
    const newKYC = new KYC({
      userId,
      name,
      email,
      kycDocuments: [kycDocPath], // Store the file path as an array
    });
    await newKYC.save();
    res.status(201).json({ message: 'KYC submitted successfully', kyc: newKYC });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting KYC', error });
  }
};
// Admin fetches KYC requests
const getKYCRequests = async (req, res) => {
  try {
    const kycRequests = await KYC.find().populate('userId', 'name email');
    res.status(200).json(kycRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching KYC requests', error });
  }
};
const approveKYC = async (req, res) => {
  try {
    const kycId = req.params.id;
    const updatedKYC = await KYC.findByIdAndUpdate(kycId, { status: 'accepted' }, { new: true });
    if (!updatedKYC) {
      return res.status(404).json({ message: 'KYC request not found' });
    }
    await User.findByIdAndUpdate(updatedKYC.userId, { kycStatus: 'accepted' });
    res.status(200).json({ message: 'KYC request approved', updatedKYC });
  } catch (error) {
    console.error('Error approving KYC request:', error);
    res.status(500).json({ message: 'Error approving KYC request', error });
  }
};
// Admin rejects KYC request
const rejectKYC = async (req, res) => {
  try {
    const kycId = req.params.id;
    const updatedKYC = await KYC.findByIdAndUpdate(kycId, { status: 'rejected' }, { new: true });
    if (!updatedKYC) {
      return res.status(404).json({ message: 'KYC request not found' });
    }
    await User.findByIdAndUpdate(updatedKYC.userId, { kycStatus: 'rejected' });
    res.status(200).json({ message: 'KYC request rejected', updatedKYC });
  } catch (error) {
    console.error('Error rejecting KYC request:', error);
    res.status(500).json({ message: 'Error rejecting KYC request', error });
  }
};
module.exports = {
  getKYCRequests,
  approveKYC,
  rejectKYC,
  submitKYC
};