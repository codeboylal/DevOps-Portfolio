import React, {useState, useEffect} from "react";

import styles from "./App.css";

import RouterPath from './routes/RouterPath.js';
import { BrowserRouter } from "react-router-dom";
import { ToasterProvider } from './Toaster.js';
import Mobile from "./components/container/mobile/mobile.jsx";
const App = () => {
  const [modalShow, setModalShow] = useState(false)



  useEffect(() => {

    const handleZoom = () => {
      const zoom = Math.round(window.devicePixelRatio * 100); // Calculate zoom level in percentage


      if (zoom > 175) {
        // console.log(`Zoom level is above 130%: ${zoom}%`);
        document.body.style.overflow = "hidden"
        setModalShow(true)
      }else{
        document.body.style.overflowY = "scroll"
        document.body.style.overflowX = "hidden"
        setModalShow(false)
      }
    };

    // Attach event listeners for zoom detection
    window.addEventListener("resize", handleZoom);
    window.addEventListener("wheel", (event) => {
      if (event.ctrlKey) {
        setTimeout(handleZoom, 0); // Detect zoom after event
      }
    });

    // Initialize zoom level
    handleZoom();

    return () => {
      // Cleanup listeners
      window.removeEventListener("resize", handleZoom);
      window.removeEventListener("wheel", handleZoom);
      setModalShow(false)
      document.body.style.overflow = "scroll"
    };
  }, []);
  return (
    <ToasterProvider >
      <BrowserRouter>
        <RouterPath />
      </BrowserRouter>
      {modalShow &&
        <Mobile />
      }   
    </ToasterProvider>    
  );
};

export default App;
