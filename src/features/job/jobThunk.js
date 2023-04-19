import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';

export const createJobThunk = async function (job, thunkAPI) {
  try {
    const res = await customFetch.post('/jobs', job);

    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async function ({ jobId, job }, thunkAPI) {
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());

    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
