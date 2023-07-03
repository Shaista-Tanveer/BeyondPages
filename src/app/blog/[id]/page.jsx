"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../[id]/blog.module.css';
const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState('');
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/blogs/${id}`);
          if (response.ok) {
            const data = await response.json();
            setBlog(data);
          } else {
            console.log('Error fetching blog:', response.status);
          }
        } catch (error) {
          console.log('Error fetching blog:', error);
        }
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className={styles['blog-container']}>
      {blog ? (
        <>
          <h1 className={styles['blog-title']}>{blog.title}</h1>
          <p className={styles['blog-description']}>{blog.description}</p>
          <img src={blog.images} alt={blog.title} className={styles['blog-image']} />
          <div className={styles['blog-hashtags']}>
            {blog.hashtags.map((tag) => (
              <span key={tag} className={styles['blog-hashtag']}>
                {tag}
              </span>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogPage;
