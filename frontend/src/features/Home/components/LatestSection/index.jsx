import React from "react";
import styles from "./index.module.css";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
const LatestSection = () => {
  return (
    <>
      <div className={styles.LatestSection}>
        <h3>Latest Products</h3>
        <div className={styles.cardContainer}>
          <p>ss</p>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default LatestSection;
