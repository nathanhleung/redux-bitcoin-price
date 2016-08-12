import React from 'react';
import styles from '../styles/Footer.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        className={styles.link}
        href="https://github.com/nathanhleung/bitcoin-redux-fetch"
      >
        <i className="fa fa-github"></i>
      </a>
      <p className={styles.author}>
        {'by '}
        <a className={styles.link} href="https://www.nathanhleung.com/">
          nathanhleung
        </a>
      </p>
    </div>
  );
}

export default Footer;