"use client"

// import React from 'react';
// import styles from './admin.module.css'; 
// import Link from 'next/link';

// const AdminDashboard = () => {
//   return (
//     <div className={styles.adminDashboard}>
//       <h2>Admin Dashboard</h2>
//       <div className={styles.options}>
//         <button className={styles.button}>
//         <Link href="/admin/addBlog"  >
//           Create Blog
//         </Link>
//         </button>
        
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



"use client"
import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';
import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);


  const handleEdit = (blogId) => {
    // Find the selected blog from the blogs list
    const selectedBlog = blogs.find((blog) => blog._id === blogId);
    if (selectedBlog) {
      // Delay the router push until the component is mounted
      setTimeout(() => {
        // router.push({
        //   pathname: '/admin/addBlog',
        //   query: { edit: true, id: blogId },
        // });
        router.push('/admin/add?edit=true&id=' + blogId);
      }, 0);
    }
  

  const handleDelete = (blogId) => {
    console.log('Delete blog:', blogId);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button>
        <Link href="/admin/addBlog" className={styles.button}>Create Blog</Link>
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Hashtags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>{blog.hashtags}</td>
              <td>
                <Button onClick={() => handleEdit(blog)}>Edit</Button>
                <Button onClick={() => handleDelete(blog._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
