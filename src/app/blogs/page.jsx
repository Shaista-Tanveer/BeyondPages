"use client"
import React, { useEffect, useState } from 'react';
import styles from '../blogs/blogs.module.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data.blogs))
      .catch((error) => console.log('Error fetching blogs:', error));
  }, []);

  return (
    <div className={styles.blogsContainer}>
      {blogs.map((blog) => (
        <div key={blog._id} className={styles.blogCard}>
          <img src={blog.image} alt="Blog" className={styles.blogImage} />
          <h2 className={styles.blogTitle}>{blog.title}</h2>
          <p className={styles.blogDescription}>{blog.description}</p>
          <div className={styles.blogTags}>
            {blog.hashtags.map((tag) => (
              <span key={tag} className={styles.blogTag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
