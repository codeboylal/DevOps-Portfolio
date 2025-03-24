import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import Toaster from "./components/Toaster/Toaster.jsx";

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

  // useCallback to prevent re-creation of function
  const showToaster = useCallback((message, type = 'info') => {
    setToaster(prev => ({ ...prev, message, type, isVisible: true }));
  }, []);

  // Effect to hide toaster after timeout
  useEffect(() => {
    if (toaster.isVisible) {
      const timer = setTimeout(() => {
        setToaster(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toaster.isVisible]); // Depend only on visibility

  return (
    <ToasterContext.Provider value={showToaster}>
      {children}
      {toaster.isVisible && <Toaster message={toaster.message} type={toaster.type} />}
    </ToasterContext.Provider>
  );
};

