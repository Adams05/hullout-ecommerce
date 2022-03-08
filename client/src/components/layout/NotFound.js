import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h3>The page you are looking for does not exist</h3>
      <Link to='/' className='btn btn-dark my-2'>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
