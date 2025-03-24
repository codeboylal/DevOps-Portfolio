const Admin = require('../../Models/Admin Models/AdminModel/adminModel');

// Handler to get admin profile headline by ID
const getAdminHeadline = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');
        res.json({ headline: admin.headline });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Handler to update admin headline by ID
const updateAdminHeadline = async (req, res) => {
    try {
        const { headline } = req.body;
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');

        admin.headline = headline;
        await admin.save();
        res.json({ message: 'Headline updated successfully' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAdminHeadline,
    updateAdminHeadline
};
