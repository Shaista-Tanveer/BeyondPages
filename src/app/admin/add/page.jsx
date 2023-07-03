"use client"

import React, { useEffect, useState } from 'react';
import styles from './addblog.module.css';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import getBlog from '../../actions/getBlog';
import { Toaster, toast } from 'react-hot-toast';

const AddBlogPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      hashtags: '',
    },
  });
  const params = useSearchParams();
  const [imageUrl, setImageUrl] = useState(null);
  const isEdit = params.get('edit') === 'true';

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'beyondpage_uploads');

      const response = await fetch('https://api.cloudinary.com/v1_1/dvsymld9l/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const { secure_url: imageUrl } = data;
      setImageUrl(imageUrl);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      const { title, description, hashtags } = data;

      const requestOptions = {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, hashtags, imageUrl }),
      };

      const url = isEdit ? `/api/blogs/${params.get('id')}` : '/api/createBlog';
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const successMessage = isEdit ? 'Blog Edited' : 'Blog Created';
        toast.success(successMessage);
      } else {
        const errorMessage = isEdit ? 'Blog Edit Failed..!' : 'Blog Creation Failed..!';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEdit) {
      const blogId = params.get('id');
      (async () => {
        const blog = await getBlog(blogId);
        if (blog) {
          setValue('title', blog.title);
          setValue('description', blog.description);
          setValue('hashtags', blog.hashtags);
          setImageUrl(blog.images); 
        }
      })();
    }
  }, [isEdit, params, setValue]);

  return (
    <div className={styles.container}>
      <Toaster />
      {isEdit ? <h2>Edit Blog</h2> : <h2>Create Blog</h2>}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="text"
          placeholder="Blog Title"
          name="title"
          {...register('title', {
            required: true,
          })}
          className={styles.titleInput}
        />
        <textarea
          placeholder="Description"
          {...register('description', {
            required: true,
          })}
          className={styles.titleInput}
        ></textarea>
        <input
          type="text"
          placeholder="Hashtags (comma-separated)"
          {...register('hashtags')}
          className={styles.hashtagsInput}
        />
      <div className={styles.imageUpload}>
  <input type="file" accept="image/*" onChange={handleImageUpload} />
  {imageUrl && (
    <div className={styles.imagePreview}>
      <img src={imageUrl} alt="Blog" className={styles.previewImage} />
      <button className={styles.deselectButton} onClick={() => setImageUrl(null)}>
        Deselect Image
      </button>
    </div>
  )}
  {!imageUrl && (
    <div className={styles.imagePreview}>
      <img src={imageUrl} alt="Blog" className={styles.previewImage} />
      <button className={styles.deselectButton} onClick={() => setImageUrl(null)}>
        Deselect Image
      </button>
    </div>
  )}
</div>
        {errors.title && <span className={styles.error}>Blog title is required</span>}
        {errors.description && <span className={styles.error}>Description is required</span>}
        <button type="submit" className={styles.submitButton}>
          {isEdit ? 'Save Changes' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
