"use client"

import { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
import styles from './navbar.module.css';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
  const [showOffcanvasMobile, setShowOffcanvasMobile] = useState(false);
  const [showOffcanvasProfile, setShowOffcanvasProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  const toggleOffcanvasMobile = () => {
    setShowOffcanvasMobile(!showOffcanvasMobile);
  };

  const toggleOffcanvasProfile = () => {
    setShowOffcanvasProfile(!showOffcanvasProfile);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGoogleSignUp = () => {
    signIn('google');
  };
  const isAdmin = session && session.user.usertype === 'admin';
  return (
    <nav className={styles.navbar}>
      {isMobile && (
        <button className={styles.menu} onClick={toggleOffcanvasMobile}>
          Menu
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      <div className={isMobile ? styles.logoContainerMobile : styles.logoContainer}>
        <Link href="/">
          <img src="/logo.jpeg" alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {!isMobile && (
        <div className={styles.navbarDesktop}>
          <ul className={styles.navbarLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              {session ? (
                <button className={styles.profileButton} onClick={toggleOffcanvasProfile}>
                  <img src={session.user.image} alt="User Avatar" className={styles.profile} />
                </button>
              ) : (
                <Link href="/dashboard">Dashboard</Link>
              )}
            </li>
          </ul>
        </div>
      )}

      <Offcanvas show={showOffcanvasMobile} onHide={toggleOffcanvasMobile}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className={styles.offcanvasLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              {session ? (
                <Link href="/profile">Profile</Link>
              ) : (
                <button type="button" onClick={handleGoogleSignUp}>
                  Sign up with Google
                </button>
              )}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {isMobile && session && (
        <button className={styles.profileButtonMobile} onClick={toggleOffcanvasProfile}>
          <img src={session.user.image} alt="User Avatar" className={styles.profile} />
        </button>
      )}

      <Offcanvas show={showOffcanvasProfile} onHide={toggleOffcanvasProfile} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className={styles.offcanvasLinks}>
            <li>
            <Link href="/admin">Admin Dashboard</Link>
            {/* {!isAdmin && <Link href="/admin">Admin Dashboard</Link> } */}
            </li>
       
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <button type="button" onClick={() => signOut()} className={styles.button}>
                Sign Out
              </button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
};

export default Navbar;
