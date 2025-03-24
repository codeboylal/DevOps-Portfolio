import { BrowserRouter } from 'react-router-dom';
import RouterPath from "./routes/routerPath.js";
import "./App.css";
import { ToasterProvider } from './Toaster.js';

import React, { useEffect, useState } from 'react';

function App() {

  //   setInterval(() => {
  //     const widthDifference = window.outerWidth - window.innerWidth;
  //     const heightDifference = window.outerHeight - window.innerHeight;

  //     if (widthDifference > 100 || heightDifference > 100) {
  //         window.location.reload();
  //     }
  // }, 1000);

  useEffect(()=>{
    document.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
  },[])

  useEffect(() => {
    // Disable zoom via keyboard shortcuts
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=" || e.key === "_")
      ) {
        e.preventDefault();
        
      }
    };
  
    

    
    // Disable zoom via mouse wheel
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
  
    // Disable zoom via touch gestures (pinch-to-zoom)
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
  
    // Disable zoom via trackpad pinch gesture
    const handleGesture = (e) => {
      e.preventDefault();
    };
  
    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("gesturestart", handleGesture);
    document.addEventListener("gesturechange", handleGesture);
    document.addEventListener("gestureend", handleGesture);
  
    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("gesturestart", handleGesture);
      document.removeEventListener("gesturechange", handleGesture);
      document.removeEventListener("gestureend", handleGesture);
    };
  }, []);


  
  
  

  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/service-worker.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  
  // …
  
  registerServiceWorker();
  
  

  return (
    <ToasterProvider>
      <BrowserRouter>
        <RouterPath />
      </BrowserRouter>
    </ToasterProvider>
  )
}

export default App;
