import { BrowserRouter } from 'react-router-dom';
import RouterPath from "./routes/routerPath.js";
import "./App.css";
import { ToasterProvider } from './Toaster.js';

import React, { useEffect } from 'react';

function App() {

  //   setInterval(() => {
  //     const widthDifference = window.outerWidth - window.innerWidth;
  //     const heightDifference = window.outerHeight - window.innerHeight;

  //     if (widthDifference > 100 || heightDifference > 100) {
  //         window.location.reload();
  //     }
  // }, 1000);

  useEffect(() => {
    // Disable zoom with keyboard shortcuts (Ctrl + '+', Ctrl + '-', Ctrl + '=', etc.)
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")
      ) {
        e.preventDefault();
      }
    };

    // Disable zoom with mouse wheel
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);


  return (
    <ToasterProvider>
      <BrowserRouter>
        <RouterPath />
      </BrowserRouter>
    </ToasterProvider>
  )
}

export default App;
