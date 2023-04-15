import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = function (e) {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = function (e) {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }

    if (!isMember) {
      dispatch(signUp({ name, email, password, action: 'register' }));
      return;
    }
    dispatch(signUp({ email, password, action: 'login' }));
  };

  const toggleMember = function () {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [user]);

  return (
    <Wrapper className='full-page'>
      <form onSubmit={onSubmit} className='form'>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* pw field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button
          className='btn btn-block btn-hipster'
          type='button'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              signUp({
                email: 'testUser@test.com',
                password: 'secret',
                action: 'login',
              })
            )
          }
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
