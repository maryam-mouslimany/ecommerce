import React from "react";
import styles from "./index.module.css";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.first_section}>
        <div className={styles.heading}>
          <span className={styles.his}>His</span>
          <span className={styles.ampersand}>&amp;</span>
          <span className={styles.hers}>Hers</span>
        </div>

        <div className={styles.copy_right}>
          <p>© 2025 All rights reserved</p>
        </div>

        <div className={styles.social_media}>
          <ul>
            <li>
              <Link to="#">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to="#">
                <BsInstagram />
              </Link>
            </li>
            <li>
              <Link to="#">
                <AiFillTwitterCircle />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.second_section}>
        <h3>About</h3>
        <ul>
          <li>About</li>
          <li>Services</li>
          <li>Careers</li>
        </ul>
      </div>

      <div className={styles.third_section}>
        <h3>Resources</h3>
        <ul>
          <li>Help</li>
          <li>Spams</li>
          <li>Privacy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
