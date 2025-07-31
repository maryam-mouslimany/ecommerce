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
          <Button label={"view Products"} />
        </div>
        <div className={styles.img_section}>
          <img
            src="https://stockperfume.com/_next/image?url=%2Fimages%2Fstockperfume%2Fbanner%2Fhome-banner-mobile.png&w=3840&q=75"
            alt="Perfume"
          />
        </div>
      </div>
    </>
  );
};

export default index;
