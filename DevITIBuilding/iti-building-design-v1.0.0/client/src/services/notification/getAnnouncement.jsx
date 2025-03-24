import axios from "axios";
import BASEURL from "../../const/const.js";

export const getAnnouncements = async () => {
  try {
    const response = await axios.get(`${BASEURL}/api/announcement/fetch`); // Adjust API route if necessary
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};
