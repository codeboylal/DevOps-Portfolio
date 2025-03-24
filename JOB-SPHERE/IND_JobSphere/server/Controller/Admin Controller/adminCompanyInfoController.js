// const Admin = require('../../Models/Admin Models/AdminModel/adminModel');

// // Fetch admin and profile info by ObjectId
// const getAdminProfile = async (req, res) => {
//   try {
//     const adminProfile = await Admin.findById(req.params.id);
//     if (!adminProfile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.status(200).json(adminProfile);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update admin and profile info by ObjectId
// const updateAdminProfile = async (req, res) => {
//   try {
//     const adminProfile = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!adminProfile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.status(200).json(adminProfile);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const saveAdminProfile = async (req, res) => {
//   const { id } = req.params;
//   const { organizationName, industryType, website, phoneNumber, address, founded, companySize } = req.body;

//   try {
//       // Find the admin by ID
//       const admin = await Admin.findById(id);

//       if (!admin) {
//           return res.status(404).json({ message: 'Admin not found' });
//       }

//       // Update the admin profile
//       admin.organizationName = organizationName || admin.organizationName;
//       admin.industryType = industryType || admin.industryType;
//       admin.website = website || admin.website;
//       admin.phoneNumber = phoneNumber || admin.phoneNumber;
//       admin.address = address || admin.address;
//       admin.founded = founded || admin.founded;
//       admin.companySize = companySize || admin.companySize;

//       // Save the updated profile
//       await admin.save();
//       res.json({ message: 'Company Info saved successfully', admin });
//   } catch (error) {
//       console.error('Error updating admin profile:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   getAdminProfile,
//   updateAdminProfile,
//   saveAdminProfile
// };











const Admin = require('../../Models/Admin Models/AdminModel/adminModel');

// // Fetch admin profile by ID
// const getCompanyProfile = async (req, res) => {
//   try {
//     const companyProfile = await CompanyProfile.findById(req.params.id); // Use CompanyProfile instead of Admin
//     if (!companyProfile) {
//       return res.status(404).json({ message: 'Company profile not found' });
//     }
//     res.status(200).json(companyProfile);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const updateAdminCompanyInfo = async (req, res) => {
//   const adminId = '66dc21979af3024e9834914a'; // The specific admin ID
//   const {
//     organizationName,
//     industryType,
//     website,
//     phoneNumber,
//     address,
//     founded,
//     companySize,
//   } = req.body;

//   try {
//     const updatedAdmin = await Admin.findByIdAndUpdate(
//       adminId,
//       {
//         companyProfile: {
//           organizationName,
//           industryType,
//           website,
//           phoneNumber,
//           address,
//           founded,
//           companySize,
//         },
//       },
//       { new: true, upsert: true } // Creates a new document if not found
//     );

//     if (!updatedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     res.status(200).json({ message: 'Company profile updated successfully', admin: updatedAdmin });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating company profile', error: error.message });
//   }
// };



const updateAdminCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params; // Admin ID
    const companyProfileData = req.body; // Data for the company profile

    // Find the admin by ID
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the companyProfile subdocument
    admin.companyProfile = companyProfileData;

    // Save the updated admin document
    await admin.save();

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get company profile for a specific admin
const getAdminCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params; // Admin ID

    // Find the admin by ID and return only the companyProfile field
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    admin.companyProfile = companyProfile;


    res.status(200).json(admin.companyProfile); // Return only the companyProfile subdocument
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  updateAdminCompanyProfile,
  getAdminCompanyProfile
};
