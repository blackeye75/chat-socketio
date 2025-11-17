import { create } from "zustand";
import {axiosInstance} from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      // console.log(res,"response from check auth");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in authCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  }

}))