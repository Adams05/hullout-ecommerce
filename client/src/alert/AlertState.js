import React, { useState } from 'react';
import AlertContext from './alertContext';

function AlertState({ children }) {
  const [alert, setAlertState] = useState(null);

  const setAlert = (msg, type) => {
    setAlertState({ msg, type });
    setTimeout(() => setAlertState(null), 2000);
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertState;
