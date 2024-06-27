import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const isUserLogged = createAsyncThunk("users/getUsers", async () => {
  try {
    const users = await axios("https://jsonplaceholder.typicode.com/users");
    return users;
  } catch (error) {
    console.error("Error fetching user session:", error);
    throw error;
  }
});
