import React from "react";
import styles from "./index.module.css";
import { Button } from "../../../../components/Button";
const index = () => {
  return (
    <>
      <div className={styles.landing_section}>
        <div className={styles.welcome_message}>
          <h1>Perfume</h1>
          <h4>Bold. Distinct. Unforgettable. </h4>
          <p>
            Introducing a scent made for the man who defines his own path. Rich
            in depth, layered with confidence.
          </p>
          <Button label={"View Products"} />
        </div>
        <div className={styles.img_section}>
          <img src="/hero-image.jpg" alt="Perfume Hero" />
        </div>
      </div>
    </>
  );
};

export default index;
