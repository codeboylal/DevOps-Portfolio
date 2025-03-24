const Admin = require('../../Models/Admin Models/AdminModel/adminModel');

// Handler to get admin profile by ID
const getAdminProfileById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');
        res.json(admin);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
    const { name, email, phoneNumber, currentLocation, jobRole, languages } = req.body;

    try {
        const updatedProfile = await Admin.findByIdAndUpdate(
            req.params.id,
            { name, email, phoneNumber, currentLocation, jobRole, languages },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Admin profile not found' });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};
module.exports = {
    getAdminProfileById,updateAdminProfile
};
