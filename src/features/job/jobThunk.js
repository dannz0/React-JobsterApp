import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import customFetch from '../../utils/axios';
import { clearValues } from './jobSlice';
import { logoutUser } from '../user/userSlice';

export const createJobThunk = async function (job, thunkAPI) {
  try {
    const res = await customFetch.post('/jobs', job);

    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.message);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    thunkAPI.rejectWithValue(error.response.message);
  }
};

export const deleteJobThunk = async function (jobId, thunkAPI) {
  try {
    thunkAPI.dispatch(showLoading());
    const res = await customFetch.delete(`/jobs/${jobId}`);

    thunkAPI.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async function ({ jobId, job }, thunkAPI) {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
