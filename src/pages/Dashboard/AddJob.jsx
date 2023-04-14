import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
  setEditJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
  const {
    isLoading,
    position,
    jobLocation,
    jobType,
    jobTypeOptions,
    company,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!company || !location || !position) {
      toast.error(`Please fill out all fields!`);
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };

  const handleJobInput = function (e) {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user.location,
        })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />

          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />

          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            list={statusOptions}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <FormRowSelect
            name='jobType'
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleJobInput}
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>

            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
