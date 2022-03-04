import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ icon, title, cartContent }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        {/* Get icon prop from app.js if needed. Using defaultprops right now.*/}
        <i className={icon} />
        {/*Get title prop from app.js if needed. Using defaultprops right now.*/}
        {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/cart'>
            Cart <FontAwesomeIcon icon={faCartShopping} />{' '}
            {!cartContent ? ' ' : cartContent}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Default props to show if there is nothing in the title and icon props.
// Anything passed into navbar as props will overwrite these props.
Nav.defaultProps = {
  title: 'Hullout Version 2.0.0',
  icon: '',
};

// Make sure title and icon are both strings.
Nav.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Nav;
