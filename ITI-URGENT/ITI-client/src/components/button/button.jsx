// import React from 'react';
// import { Button } from '@mui/material';

// const CommonButton = ({ variant = 'contained', onClick, disabled, secondary, text ,borderRadius = '', height = '53px', width='374px' , ...props }) => {
//   return (
//     <Button
//       variant={variant}
//       onClick={onClick}
//       sx={{
//         backgroundColor: disabled ? 'var(--button-bg-disabled)' : secondary ? '#FFFFFF' : '#19191A',
//         color: disabled ? '#19191A' : secondary ? '#19191A' :  '#FFFFFF',
//         borderRadius: borderRadius?.length > 0 ?  borderRadius : '100px',
//         width: width?.length > 0 &&  width,
//         height: height?.length > 0 && height ,
//         cursor: disabled && 'default',
//         border: disabled ? '2px solid #19191A' : secondary && '2px solid #19191A',
//         textTransform: 'none', 
//         ...props.sx,
//       }}
//       {...props}
//     >
//       {text}
//     </Button>
//   );
// };

// export default CommonButton;




















import React from 'react';
import { Button, styled } from '@mui/material';
import styles from "./button.module.css"

const CommonButton = ({
  variant = 'contained',
  onClick,
  disabled,
  secondary,
  text,
  borderRadius = '',
  height = '53px',
  width = '374px',
  imageProp,
  imageLeft="35%",
  imageTop="30%",
  ...props
}) => {
  return (
    <div className={
      styles.imgButtonDiv
    }>
      <div style={{
        display: !imageProp && 'none',
        left: imageLeft,
      top: imageTop      }}
        className={styles.image}
      >
        <img 
          src={imageProp}
          alt='ITI Buildings Project'
        />
      </div>
      <Button
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: disabled
          ? 'var(--button-bg-disabled)'
          : secondary
          ? '#FFFFFF'
          : '#19191A',
        color: disabled ? '#19191A' : secondary ? '#19191A' : '#FFFFFF',
        borderRadius: borderRadius?.length > 0 ? borderRadius : '100px',
        width: width?.length > 0 && width,
        height: height?.length > 0 && height,
        cursor: disabled && 'default',
        border: disabled ? '2px solid #19191A' : secondary && '2px solid #19191A',
        textTransform: 'none',
        ...props.sx,
        '@media (min-width:500px) and (max-width: 900px)': {
          width: '320px', 
        },
        '@media (max-width: 499px)': {
          width: '280px', 
        },
      }}
      {...props}
    >
      {text}
    </Button>
    </div>
  );
};

export default CommonButton;
