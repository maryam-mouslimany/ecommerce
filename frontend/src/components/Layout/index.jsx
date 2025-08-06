import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
