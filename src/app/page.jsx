"use client"
import Image from 'next/image';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
const [image,setImage]=useState('');
  useEffect(() => {
    fetch('/api/blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data.blogs))
      .catch((error) => console.log('Error fetching blogs:', error));
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to My Nutrition Blog!</h1>
        <div className={styles.heroQuote}>
          <blockquote>
            "Let food be thy medicine and medicine be thy food." - Hippocrates
          </blockquote>
        </div>
        <p>Explore the world of food and nutrition with expert advice and personalized meal plans.</p>
        <Link href="/about">
          <span className={styles.btn}>Learn More</span>
        </Link>
      </section>

      <section className={styles.featuredBlogs}>
        <h2>Featured Blogs</h2>
        <div className={styles.blogList}>
          {blogs.map((blog) => (
            <div key={blog.id} className={styles.blogCard}>
          <Image src={blog.images} alt={blog.title} width={300} height={200} />
              <h3>{blog.title}</h3>
              <p>{blog.summary}</p>
              <Link href={`/blog/${blog._id}`}>
                <span className={styles.btn}>Read More</span>
              </Link>
            </div>
          ))}
        </div>
        <Link href="/blogs">
          <span className={styles.btn}>View All Blogs</span>
        </Link>
      </section>

      <section className={styles.clientReviews}>
        <h2>Client Reviews</h2>
        <div className={styles.reviewCard}>
          <div className={styles.reviewAvatar}>
            <Image src="/man.png" alt="Client 1" width={80} height={80} />
          </div>
          <div className={styles.reviewContent}>
            <h3>Client Name</h3>
            <p>"I am extremely satisfied with the nutritional guidance I received. Highly recommended!"</p>
          </div>
        </div>
        <div className={styles.reviewCard}>
          <div className={styles.reviewAvatar}>
            <Image src="/man.png" alt="Client 2" width={80} height={80} />
          </div>
          <div className={styles.reviewContent}>
            <h3>Client Name</h3>
            <p>"Thanks to the personalized meal plans, I have achieved my fitness goals faster than ever."</p>
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <h2>Services</h2>
        <p>As a nutritionist, I offer personalized services to help you achieve your health goals:</p>
        <div className={styles.servicesList}>
          <div className={styles.serviceCard}>
            <Image src="/biryani.png" alt="Service 1" width={300} height={200} />
            <h3>Diet Planning</h3>
            <p>Customized diet plans tailored to your individual needs and goals.</p>
          </div>
          <div className={styles.serviceCard}>
            <Image src="/chicken.png" alt="Service 2" width={300} height={200} />
            <h3>Meal Planning</h3>
            <p>Delicious and nutritious meal plans designed to support your health and well-being.</p>
          </div>
          <div className={styles.serviceCard}>
            <Image src="/chicken.png" alt="Service 3" width={300} height={200} />
            <h3>Nutritional Consultation</h3>
            <p>One-on-one consultation to address your specific nutritional concerns and optimize your diet.</p>
          </div>
        </div>
        <Link href="/services">
          <span className={styles.btn}>Explore Services</span>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
