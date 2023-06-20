'use client'
import React, { useState, useEffect } from 'react'

import styles from './admin.module.css'
import { Pagination, Table, Form, Button, InputGroup } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import useDebouncedValue from '../hooks/useDebounce'

const fetcBlogs = async (params) => {
  if (params) {
    console.log('params', params)
    const url = `/api/blogs?title=${params}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  const response = await fetch('/api/blogs')
  const data = await response.json()
  return data
}

const PAGE_SIZE = 5 // Number of items per page
const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([])
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const params = useSearchParams()
  const debouneValue = useDebouncedValue(searchQuery)

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof blog.hashtags === 'string' &&
        blog.hashtags.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/api/blogs')
    //     const data = await response.json()
    //     setBlogs(data)
    //   } catch (error) {
    //     toast.error('Error fetching blogs:', error)
    //   }
    // }

    // fetchData()

    ;(async () => {
      const data = await fetcBlogs()
      setBlogs(data)
    })()
  }, [params])

  // Calculate pagination values
  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1) // Reset to first page when search query changes
  }

  const handleEdit = (blogId) => {
    const selectedBlog = blogs.find((blog) => blog._id === blogId)
    if (selectedBlog) {
      setTimeout(() => {
        router.push('/admin/add?edit=true&id=' + blogId)
      }, 500)
    }
  }

  useEffect(() => {
    ;(async () => {
      const data = await fetcBlogs(debouneValue)
      setBlogs(data)
    })()
  }, [debouneValue])

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
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  )
}

export default AdminDashboard
