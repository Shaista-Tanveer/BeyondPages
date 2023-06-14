"use client"
import React from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css'; // Import the CSS file
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
const Dashboard = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      email: email,
      password:password,
    }).then((callback) => {
      if (callback?.error) {
        // toast.error(callback.error);
         
      } else if (callback?.ok) {
        // toast.success("Logged in");
      }
      // setIsLoading(false);
    });
  };
  
  const handleGoogleSignUp = () => {
    signIn('google');
  };


  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.registerSection}>
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
        <br />
        <br />
        <h2 className={styles.registerSection}>Create an Account Using Socials</h2>
        <div className={styles.googleRegister}>
          <button onClick={handleGoogleSignUp}>Register with Google</button>
        </div>
        <div className={styles.loginLink}>
          Already have an account? <Link href="/dashboard/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


