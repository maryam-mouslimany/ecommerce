import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.css";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(input.trim()); 
    }
  };

  return (
    <div className={styles.searchContainer}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
