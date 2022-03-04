import React, { useContext } from 'react';
import AlertContext from '../../alert/alertContext';

// pass alert as prop to function and set classname dynamically
const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i>
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
