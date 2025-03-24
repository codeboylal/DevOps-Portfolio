import { create } from "zustand";
import { getUserData } from "../services/user/getUser.js";

import ITI_logo from "../components/sideBar/assets/Layer_1.svg";

export const useAccessStore = create((set) => ({
  access: [],
  nameDB: "",
  userImg: "",
  role: "",
  ITI_logo: ITI_logo,
  fetchAccess: async (userId, navigate) => {
    if (!userId) return navigate("/signIn"); 

    try {
      const response = await getUserData({ userId });
      const data = response?.data?.data;

      set({
        access: data?.access || [],
        nameDB: data?.name || "",
        userImg: data?.userImg || "",
        role: data?.role || "",
      });

      sessionStorage.setItem("name", data?.name);
      sessionStorage.setItem("userRole", data?.role);
    } catch (err) {
      console.error(err);
      navigate("/signIn"); // Redirect to sign-in page on error
    }
  },
}));
