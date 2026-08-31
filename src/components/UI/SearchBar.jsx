import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchTerm, onSearch, onClear = () => {}, placeholder = 'Search exercises...' }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={`${styles.wrapper} ${isFocused ? styles.focused : ''}`}>
      <span aria-hidden="true">🔍</span>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchTerm && (
        <button type="button" className={styles.clearBtn} onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
