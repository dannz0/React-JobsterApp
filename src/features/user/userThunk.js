import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const signUpThunk = async function (url, user, thunkAPI) {
  try {
    const res = await customFetch.post(url, user);

    return { data: res.data, action: user.action };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async function (url, user, thunkAPI) {
  try {
    const res = await customFetch.patch(url, user);

    return res.data;
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
    }

    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
