import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      toast.success(`See you again, ${state.user.name}`);
      state.isSidebarOpen = false;
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        const { user } = payload.data;
        const { action } = payload;

        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);

        toast.success(
          action === 'register'
            ? `Hello there ${user.name}!`
            : `Welcome back ${user.name}`
        );
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async function (user, thunkAPI) {
    try {
      const res = await customFetch.post(`auth/${user.action}`, user);

      return { data: res.data, action: user.action };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
