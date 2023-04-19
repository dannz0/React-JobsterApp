import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import { signUpThunk, updateUserThunk } from './userThunk';
import { clearStoreThunk } from './userThunk';

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
    logoutUser: (state, { payload }) => {
      if (payload) {
        toast.success(`${payload}`);
      }
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
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;

        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);

        toast.success('Profile updated!');
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error');
      });
  },
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async function (user, thunkAPI) {
    return signUpThunk(`auth/${user.action}`, user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (user, thunkAPI) {
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
