import React from "react";
import styles from "./index.module.css";

const They = () => {
  return (
    <>
      <div className={styles.heading}>
        <span className={styles.his}>His</span>
        <span className={styles.ampersand}>&amp;</span>
        <span className={styles.hers}>Hers</span>
      </div>

      <div className={styles.they_container}>
        <div className={styles.his_section}>
          <h1>His</h1>
          <p>Explore Men's Latest Perfumes</p>
        </div>

        <div className={styles.hers_section}>
          <h1>Hers</h1>
          <p>Explore Women's Latest Perfumes</p>
        </div>
      </div>
    </>
  );
};

export default They;
