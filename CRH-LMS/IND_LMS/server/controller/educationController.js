const Education = require("../models/educationSchema");

// Create Education
exports.createEducation = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      educationLevel,
      university,
      courseName,
      specialization,
      courseType,
      startYear,
      endYear,
      marks,
      isPrimaryEducation,
    } = req.body;

    const newEducation = new Education({
      user: userId,
      educationLevel,
      university,
      courseName,
      specialization,
      courseType,
      startYear,
      endYear,
      marks,
      isPrimaryEducation,
    });

    await newEducation.save();
    res.status(201).json({ message: "Education added successfully", newEducation });
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all education details for a user
exports.getEducation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const educationList = await Education.find({ user: userId });
    res.status(200).json(educationList);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Education
exports.updateEducation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const educationId = req.params.id;
    
    const updatedEducation = await Education.findOneAndUpdate(
      { _id: educationId, user: userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({ message: "Education record not found" });
    }

    res.status(200).json({ message: "Education updated successfully", updatedEducation });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Education
exports.deleteEducation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const educationId = req.params.id;

    const deletedEducation = await Education.findOneAndDelete({ _id: educationId, user: userId });

    if (!deletedEducation) {
      return res.status(404).json({ message: "Education record not found" });
    }

    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
