import React from "react";
import styles from "./index.module.css";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerContent}>
        {/* Brand Information Column */}
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <span className={styles.his}>HIS&</span>
            <span className={styles.hers}>HERS</span>
          </div>
          <p className={styles.description}>
            His & Hers is your curated destination for signature scents made for him, for her, and for every unforgettable moment. From everyday elegance to luxurious aromas, we bring you a refined selection of perfumes that speak to personality and style.
          </p>
          <div className={styles.socialMedia}>
            <Link to="#" className={styles.socialIcon}>
              <FaFacebook />
            </Link>
            <Link to="#" className={styles.socialIcon}>
              <FaTwitter />
            </Link>
            <Link to="#" className={styles.socialIcon}>
              <BsInstagram />
            </Link>
            <Link to="#" className={styles.socialIcon}>
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Categories Column */}
        <div className={styles.column}>
          <h3>Categories</h3>
          <ul>
            <li><Link to="#">Summer</Link></li>
            <li><Link to="#">Body Mist</Link></li>
            <li><Link to="#">Luxury</Link></li>
            <li><Link to="#">Testers</Link></li>
            <li><Link to="#">Indoor</Link></li>
          </ul>
        </div>

        {/* Shopping Column */}
        <div className={styles.column}>
          <h3>Shopping</h3>
          <ul>
            <li><Link to="#">For Him</Link></li>
            <li><Link to="#">For Her</Link></li>
            <li><Link to="#">Unisex</Link></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className={styles.column}>
          <h3>Customer care</h3>
          <ul>
            <li><Link to="#">Help center</Link></li>
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Privacy policy</Link></li>
            <li><Link to="#">Returns & refund</Link></li>
            <li><Link to="#">Survey & Feedback</Link></li>
          </ul>
        </div>

        {/* Pages Column */}
        <div className={styles.column}>
          <h3>Pages</h3>
          <ul>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Shopping</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">Cart</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyrightSection}>
        <div className={styles.separator}></div>
        <p className={styles.copyright}>© 2025 His&Hers inc. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
