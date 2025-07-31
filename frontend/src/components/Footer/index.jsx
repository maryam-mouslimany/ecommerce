import React from "react";
import styles from "./index.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={first_section}>
          <div className={styles.heading}>
            <span className={styles.his}>His</span>
            <span className={styles.ampersand}>&amp;</span>
            <span className={styles.hers}>Hers</span>
          </div>
          <div className={styles.copy_right}>
            <p>Copyright@2025 all rights reserved</p>
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
                  <FaSquareInstagram />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaTwitterSquare />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={second_section}>
        <h3>About</h3>
        <ul>
          <li>About</li>
          <li>Services</li>
          <li>Careers</li>
        </ul>
      </div>
      <div className={third_section}>
        <h3>About</h3>
        <ul>
          <li>About</li>
          <li>Services</li>
          <li>Careers</li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
