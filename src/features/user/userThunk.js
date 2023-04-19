import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async function (message, thunkAPI) {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());

    return Promise.resolve();
  } catch (error) {
    thunkAPI.dispatch();
    return Promise.reject();
  }
};
