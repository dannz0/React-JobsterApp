import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleSidebar } from '../features/user/userSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggle = function () {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper onMouseLeave={() => setShowLogout(false)}>
      <div className='nav-center'>
        <button className='toggle-btn' type='button' onClick={toggle}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container'>
          <button
            className='btn'
            type='button'
            onMouseEnter={() => setShowLogout(true)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              className='dropdown-btn'
              type='button'
              onClick={() => dispatch(logoutUser('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
