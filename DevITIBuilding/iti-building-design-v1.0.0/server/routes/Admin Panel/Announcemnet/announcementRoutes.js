// // routes/announcementRoutes.js
// const express = require("express");
// const { createAnnouncement, getAnnouncements  } = require("../../../controllers/Admin Panel/Announcement/announcementController");

// const announcementRoutes = express.Router();

// announcementRoutes.use("/add", createAnnouncement);
// announcementRoutes.get("/fetch", getAnnouncements);
// module.exports = {announcementRoutes}



const express = require("express");
const { createAnnouncement, getAnnouncements } = require("../../../controllers/Admin Panel/Announcement/announcementController");

const announcementRoutes = express.Router();

// Use POST for creating announcements
announcementRoutes.post("/add", createAnnouncement);  
// Use GET for fetching announcements
announcementRoutes.get("/fetch", getAnnouncements);

module.exports = { announcementRoutes };
