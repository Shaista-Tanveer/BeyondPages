"use client"
import React from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css'; // Import the CSS file
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      })
    }).then((res) => res.json());


    if(res.status === "ok"){
     
      signIn("credentials", {
        redirect: false,
        email: email,
        password:password,
      }).then((res) => {

        if(res.error){
          alert(res.error);
        }
        else{
          router.push("/");
        }
      });
      }
      else{
        alert(res.error);
      }
  };
  
  const handleGoogleSignUp = () => {
    signIn('google');
  };


  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.registerSection}>
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={username} onChange={(e) => setusername(e.target.value)} />
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


