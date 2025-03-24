import React, { createContext, useState, useContext } from 'react';
import Toaster from './Common Components/React Toaster/toaster';

const ToasterContext = createContext();

export const useToaster = () => {
  return useContext(ToasterContext);
};

export const ToasterProvider = ({ children }) => {
  const [toaster, setToaster] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const showToaster = (message, type = 'info') => {
    setToaster({ message, type, isVisible: true });

    setTimeout(() => {
      setToaster({ message: '', type: '', isVisible: false });
    }, 5000); // Change timeout duration if needed
  };

  return (
    <ToasterContext.Provider value={showToaster}>
      {children}
      {toaster.isVisible && (
        <Toaster message={toaster.message} type={toaster.type} />
      )}
    </ToasterContext.Provider>
  );
};
