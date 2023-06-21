'use client'
import React, { useState, useEffect } from 'react'
import styles from './admin.module.css'
import { Pagination, Table, Form, Button, InputGroup } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import useDebouncedValue from '../hooks/useDebounce'

const fetchBlogs = async (params, page = 1, limit = 10) => {
  if (params) {
    const url = `/api/blogs?title=${params}&page=${page}&limit=${limit}`;
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  const response = await fetch(`/api/blogs?page=${page}&limit=${limit}`);
  const data = await response.json()
  return data
}


const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([])
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const params = useSearchParams()
  const debouneValue = useDebouncedValue(searchQuery)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
 

 useEffect(() => {
  (async () => {
    const data = await fetchBlogs(debouneValue, page, limit);
    setBlogs(data.blogs);
    setTotalPages(data.totalPages);
  })();
}, [debouneValue, page, limit]);
  


  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
    
  }
  const handlePageChange = async (selectedPage) => {
    setPage(selectedPage);
    const data = await fetchBlogs(debouneValue, selectedPage, limit);
    setBlogs(data.blogs); 
  };
  

  const handleEdit = (blogId) => {
    const selectedBlog = blogs.find((blog) => blog._id === blogId)
    console.log(selectedBlog,"selectedBlog");
    if (selectedBlog) {
      setTimeout(() => {
        router.push('/admin/add?edit=true&id=' + blogId)
      }, 500)
    }
  }


  const handleDelete = async (blogId) => {
    try {
      const selectedBlog = blogs.find((blog) => blog._id === blogId)
      if (selectedBlog) {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== blogId)
          )

          toast.success('Blog deleted successfully')
        } else {
          toast.error('Error deleting blog')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={styles.adminDashboard}>
      <Toaster position="top-center" />
      <div className={styles.headerRow}>
        <h1 className={styles.adminDashboardTitle}>Admin Dashboard</h1>
        <button className={styles.newBlogButton}>
          <Link href="/admin/add" className={styles.linkButton}>
            New Blog
          </Link>
        </button>
      </div>

      <h2 className={styles.tableName}>
        Blog Table
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className={styles.searchBar}
        />
      </h2>

      <Table striped bordered hover className={styles.table}>
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
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>{blog.hashtags}</td>
              <td>
                <div className={styles.buttonGroup}>
                  <Button
                    className={styles.editButton}
                    onClick={() => handleEdit(blog._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={styles.pagination}>
      <Pagination>
  <Pagination.First onClick={() => handlePageChange(1)} />
  <Pagination.Prev
    onClick={() => handlePageChange(Math.max(1, page - 1))}
    disabled={page === 1}
  />
  <Pagination.Item active>{page}</Pagination.Item>
  <Pagination.Next onClick={() => handlePageChange(page + 1)} />
  <Pagination.Last onClick={() => handlePageChange(totalPages)} />

</Pagination>

      </div>
    </div>
  )
}

export default AdminDashboard
