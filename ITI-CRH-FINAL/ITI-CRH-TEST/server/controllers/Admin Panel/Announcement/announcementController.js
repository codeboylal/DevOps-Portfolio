// // controllers/announcementController.js
// const Announcement = require("../../../Models/Announcements/announcementModel");


// const createAnnouncement = async (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text) {
//       return res.status(400).json({ message: "Announcement text is required" });
//     }

//     const newAnnouncement = new Announcement({ text });
//     await newAnnouncement.save();
    
//     res.status(201).json({ message: "Announcement saved successfully", newAnnouncement });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// const getAnnouncements = async (req, res) => {
//   try {
//     // Fetching all announcements and sorting by newest first
//     const announcements = await Announcement.find().sort({ createdAt: -1 });

//     if (!announcements.length) {
//       return res.status(404).json({ message: "No announcements found" });
//     }

//     res.status(200).json({ success: true, data: announcements });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


// module.exports = {createAnnouncement, getAnnouncements}










const Announcement = require("../../../Models/Announcements/announcementModel");
const Plan = require("../../../Models/plan/projectPlans.js");
const Facade = require("../../../Models/facades/projectFacades.js");
const ResponseHandler = require("../../../utils/responseHandler.js");

const createAnnouncement = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Announcement text is required" });
    }

    const newAnnouncement = new Announcement({ text });
    await newAnnouncement.save();
    
    res.status(201).json({ message: "Announcement saved successfully", newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// const getAnnouncements = async (req, res) => {
//   try {
//     // Fetching all announcements and sorting by newest first
//     const announcements = await Announcement.find().sort({ createdAt: -1 });

//     if (!announcements.length) {
//       return res.status(404).json({ message: "No announcements found" });
//     }

//     res.status(200).json({ success: true, data: announcements });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



const getAnnouncements = async (req, res) => {
  try {
    // Fetch all plans, facades, and announcements
    const plans = await Plan.find();
    const facades = await Facade.find();
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    const plansNotifications = plans.flatMap(plan => plan.notifications || []);
    const facadesNotifications = facades.flatMap(facade => facade.notifications || []);

    // Combine notifications and announcements
    const combinedData = [...plansNotifications, ...facadesNotifications, ...announcements]
      .filter(item => item.createdAt) // Ensure valid dates
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, data: combinedData, message: "Notifications and Announcements Fetched Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// module.exports = { fetchNotificationsAndAnnouncements };

module.exports = { createAnnouncement, getAnnouncements };



