import api from "@/app/api/axiosInstance";
import { makeAutoObservable } from "mobx";

class UserAction {
  constructor() {
    makeAutoObservable(this);
  }

  getUserCosts(token: string) {
    try {
      return api.get("todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteUserCost(id: string, token: string) {
    try {
      api.delete(id, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      console.log(error)
    }
  }

  refreshAccessToken() {}

  storeDataToLocalStorage(dataType: string, data: string) {
    localStorage.setItem(dataType, data);
  }

  getAccessToken() {
    try {
      const storedValue = localStorage.getItem("access_token");
      if (storedValue === null) {
        return null;
      }
      return JSON.parse(storedValue);
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return null;
    }
  }
}

export default new UserAction();
