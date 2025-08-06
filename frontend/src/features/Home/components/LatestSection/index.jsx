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
          <Card 
            title="Sample Product 1" 
            price="$99.99" 
            onViewMore={() => console.log('View more clicked')} 
            product={{ id: 1, name: 'Sample Product 1' }}
          />
          <Card 
            title="Sample Product 2" 
            price="$89.99" 
            onViewMore={() => console.log('View more clicked')} 
            product={{ id: 2, name: 'Sample Product 2' }}
          />
          <Card 
            title="Sample Product 3" 
            price="$79.99" 
            onViewMore={() => console.log('View more clicked')} 
            product={{ id: 3, name: 'Sample Product 3' }}
          />
          <Card 
            title="Sample Product 4" 
            price="$69.99" 
            onViewMore={() => console.log('View more clicked')} 
            product={{ id: 4, name: 'Sample Product 4' }}
          />
          <Card 
            title="Sample Product 5" 
            price="$59.99" 
            onViewMore={() => console.log('View more clicked')} 
            product={{ id: 5, name: 'Sample Product 5' }}
          />
          <Card 
            title="Sample Product 6" 
            price="$49.99" 
            onViewMore={() => console.log('View more clicked')} 
            product={{ id: 6, name: 'Sample Product 6' }}
          />
        </div>
      </div>
    </>
  );
};

export default LatestSection;
