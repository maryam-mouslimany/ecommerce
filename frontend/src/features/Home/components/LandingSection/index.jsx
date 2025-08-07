import React from "react";
import styles from "./index.module.css";
import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router-dom";

const LandingSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.landing_section}>
        <div className={styles.welcome_message}>
          <h1>His & Hers Collection</h1>
          <h4>Distinctive fragrances for every personality</h4>
          <p>
            Discover scents that define who you are. From bold and confident to
            elegant and refined, find the perfect fragrance that tells your
            unique story.
          </p>
          <Button
            label={"Explore Collection"}
            variant="primary"
            onClick={() => navigate("/products")}
          />
        </div>
        <div className={styles.img_section}>
          <div className={styles.mosaic}>
            <img src="/hero-image.jpg" alt="Perfume 1" />
            <img src="/hero-image.jpg" alt="Perfume 2" />
            <img src="/hero-image.jpg" alt="Perfume 3" />
            <img src="/hero-image.jpg" alt="Perfume 4" />
            <img src="/hero-image.jpg" alt="Perfume 5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingSection;
