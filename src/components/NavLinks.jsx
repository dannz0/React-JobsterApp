import links from '../utils/links';
import { NavLink } from 'react-router-dom';

export function NavLinks({ toggle }) {
  return (
    <div className='nav-links'>
      {links.map((menuItem) => {
        const { id, text, path, icon } = menuItem;
        return (
          <NavLink
            key={id}
            to={path}
            onClick={toggle}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
