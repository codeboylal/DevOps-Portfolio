import React from 'react';
import { Button } from '@mui/material';
import styles from './paginationComponent.module.css';

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  window.scrollTo(0,0)

  return (
    <div className={styles.paginationContainers}>
      {/* Previous Button */}
      <Button 
        variant="outlined" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        sx={{
          color: '#FF702D',
          border: '2px solid #FF702D',
          borderRadius: '2px',
          textTransform: 'none',
          backgroundColor:  'transparent',

          '&:hover': {
            backgroundColor: '#FF6D00',
            color: 'white',
            borderColor: '#FF6D00',
          },
          '&:disabled': {
      
            borderColor: 'transparent',


            backgroundColor:  'rgb(236, 236, 236)',
            color: '#FF702D',
          }
        }}
      >
        Previous
      </Button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1; // Page numbers start from 1
        return (
          <Button 
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            sx={{
              color: currentPage === pageNumber ? 'white' : '#FF6D00',
              backgroundColor: currentPage === pageNumber ? '#FF6D00' : 'white',
              borderRadius: '2px',
              textTransform: 'none',
              boxShadow: currentPage === pageNumber ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
              '&:hover': {
                backgroundColor: '#FF6D00',
                color: 'white',

              },

            }}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button 
        variant="outlined" 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        sx={{
          color: '#FF702D',
          border: '2px solid #FF702D',
          borderRadius: '2px',
          textTransform: 'none',
          backgroundColor:  'transparent',


          '&:hover': {
            backgroundColor: '#FF702D',
            color: 'white',
            // borderColor: '#FF6D00',

          },
          '&:disabled': {
      
            borderColor: 'transparent',


            backgroundColor:'rgb(236, 236, 236)',
            color: '#FF702D',
          }
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationComponent;
