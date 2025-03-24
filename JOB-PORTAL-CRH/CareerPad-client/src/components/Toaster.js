import React, { createContext, useState, useContext } from 'react';
import Toaster from './Toaster/toaster';

const ToasterContext = createContext();

export const useToaster = () => {
  return useContext(ToasterContext);
};

export const ToasterProvider = ({ children }) => {
  const [toasters, setToasters] = useState([]);

  const showToaster = (message, type = 'info') => {
    const newToast = { message, type, id: new Date().getTime() };

    setToasters((prevToasters) => [...prevToasters, newToast]);

    // Remove the toast after 5 seconds
    setTimeout(() => {
      setToasters((prevToasters) => prevToasters.filter(toast => toast.id !== newToast.id));
    }, 5000);
  };

  return (
    <ToasterContext.Provider value={showToaster}>
      {children}
      {toasters.map(toast => (
        <Toaster key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </ToasterContext.Provider>
  );
};
