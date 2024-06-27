import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { isUserLogged } from "./actions";

export interface IUsersState {
  users: any;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IUsersState = {
  users: [],
  loading: true,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // setUsersState: (state, action: PayloadAction<boolean>) => {
    //   state.usersState = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isUserLogged.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isUserLogged.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(isUserLogged.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const { setUsersState } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
