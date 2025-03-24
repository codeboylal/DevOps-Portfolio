// CustomSearch.jsx
import React from 'react';
import styles from './customSearch.module.css';
import SearchIcon from '@mui/icons-material/Search';

const CustomSearch = ({ on_change,searchType, placeholderText, buttonText, customInputStyles, customButtonStyles ,searchValue}) => {
  return (
    <div>
      {/* Simple Search Input */}
      {searchType === 'simple' && (
        <div className={styles.searchContainer}>

        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholderText}
          style={customInputStyles} // Allow users to pass custom styles for input
        />
        </div>

      )}

      {/* Search Input with Button */}
      {searchType === 'withButton' && (
        <div className={styles.searchWithButton}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={placeholderText}
            style={customInputStyles} // Allow users to pass custom styles for input
          />
          <button
            className={styles.searchButton}
            style={customButtonStyles} // Allow users to pass custom styles for button
          >
            {buttonText}
          </button>
        </div>
      )}
      

   {/* Search Input with Material UI Search Icon */}
   {searchType === 'searchWithSearchIcon' && (
        <div className={styles.searchWithIconContainer}>
          <SearchIcon className={styles.searchIcon} /> {/* Material UI Search Icon */}
          <input
            type="text"
            className={styles.searchInputWithIcon}
            placeholder={placeholderText}
            style={customInputStyles} // Allow users to pass custom styles for input
            value={searchValue}
            onChange={on_change}
          />
        </div>
      )}
    </div>
  );
};

export default CustomSearch;





// how you can use them and change the style:


{/* <CustomSearch
        searchType="withButton"
        placeholderText="Search your courses..."
        buttonText="SEARCH"
        customInputStyles={{ borderRadius: '25px' }} // Example custom styles for input
        customButtonStyles={{ backgroundColor: '#FF6F00', color: 'white' }} // Custom button styles
      /> */}