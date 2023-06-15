"use client"


import React, { useEffect, useState } from 'react';
import styles from './addBlog.module.css';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import getBlog from '../../actions/getBlog';

const AddBlogPage = () => {
  const { register, handleSubmit, watch,
      setValue,
    formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      hashtags: '',
    }
  });
  const params = useSearchParams();
  const [images, setImages] = useState([]);
  const isEdit = params.get('edit') === 'true';


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setImages([...images, ...imageFiles]);
  };

  const handleImageDeselect = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);``
  };

  const handleFormSubmit = async (data) => {
    try {
      const { title, description, hashtags } = data;
      const formData = new FormData();
      formData.append('title',title );
      formData.append('description', description);
      formData.append('hashtags', hashtags);
      // images.forEach((image, index) => {
      //   formData.append('images', image);
      // });

      const response = await fetch('/api/createBlog', {
                method: "POST",
                body: JSON.stringify({
                  title,
                  description,
                  hashtags,
                }),
              });

      if (response.ok) {
        // Blog created successfully, handle the response
        console.log('Blog created successfully');
      } else {
        // Blog creation failed, handle the error
        console.log('Blog creation failed');
      }
    } catch (error) {
      // Error occurred while making the API hit, handle the error
      console.log('Error creating blog:', error.message);
    }
  };

useEffect(() => {
    if (isEdit) {
      // Fetch the blog details from the API
      const blogId = params.get('id');
      (
        async () => {
          const blog = await getBlog(blogId);
          if (blog) {
            setValue('title', blog.title);
            setValue('description', blog.description);
            setValue('hashtags', blog.hashtags);
          }
        }
      )()
    }
}, [params]);

  return (
    <div className={styles.container}>
      {
        isEdit ? (
          <h2>Edit Blog</h2>
        ) : (
          <h2>Create Blog</h2>
        )
      }
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="text"
          placeholder="Blog Title"
          name='title'
          {
            ...register("title", {
              required: true,
            })
          }
          className={styles.titleInput}
        />
        <textarea
          placeholder="Description"
          {
            ...register("description", {
              required: true,
            })
          }
          className={styles.titleInput}
        ></textarea>
        <input
          type="text"
          placeholder="Hashtags (comma-separated)"
         {
            ...register("hashtags", {
              required: true,
            })
         }
          className={styles.hashtagsInput}
        />
        <label htmlFor="imageInput" className={styles.fileInputLabel}>
          Upload Images
        </label>
        <input
          type="file"
          id="imageInput"
          multiple
          onChange={handleImageUpload}
          className={styles.fileInput}
        />
        <div className={styles.previewImages}>
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className={styles.previewImage}
            />
          ))}
        </div>
        <div>
          {images.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className={styles.previewImage}
              />
              <button
                type="button"
                onClick={() => handleImageDeselect(index)}
                className={styles.deselectButton}
              >
                Deselect
              </button>
            </div>
          ))}
        </div>
        <button type="submit"
          className={styles.submitButton}
          >
            {
              isEdit ? "edit" : "create"
            }
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;

