import React from 'react';
import { Box } from '@mui/material';
import './loader.css';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width={'100%'}
      // bgcolor="#f9f9f9"
    >
      <div className="wave-loader">
        {/* Creating a grid of cubes */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="cube" key={index}>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Loader;