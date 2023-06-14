"use client"

// import React, { useState } from 'react';
// import styles from './addBlog.module.css'; 

// const AddBlogPage = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [hashtags, setHashtags] = useState('');
//   const [images, setImages] = useState([]);

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleHashtagsChange = (e) => {
//     setHashtags(e.target.value);
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageFiles = files.filter((file) => file.type.startsWith('image/'));
//     setImages([...images, ...imageFiles]);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     // console.log('Blog Title:', title,'Description:', description,'Hashtags:', hashtags,'Images:', images);
 
//     try {
    
//       const response = await fetch('/api/createBlog', {
//         method: "POST",
//         body: JSON.stringify({
//           title,
//           description,
//           hashtags,
//         }),
//       });

//       if (response.ok) {
//         // Blog created successfully, handle the response
//         console.log('Blog created successfully');
//       } else {
//         // Blog creation failed, handle the error
//         console.log('Blog creation failed');
//       }
//     } catch (error) {
//       // Error occurred while making the API hit, handle the error
//       console.log('Error creating blog:', error.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Create Blog</h2>
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={handleTitleChange}
//           className={styles.titleInput}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={handleDescriptionChange}
//           className={styles.titleInput}
//         ></textarea>
//         <input
//           type="text"
//           placeholder="Hashtags (comma-separated)"
//           value={hashtags}
//           onChange={handleHashtagsChange}
//           className={styles.hashtagsInput}
//         />
//         <label htmlFor="imageInput" className={styles.fileInputLabel}>
//           Upload Images
//         </label>
//         <input
//           type="file"
//           id="imageInput"
//           multiple
//           onChange={handleImageUpload}
//           className={styles.fileInput}
//         />
//         <div className={styles.previewImages}>
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={URL.createObjectURL(image)}
//               alt={`Preview ${index}`}
//               className={styles.previewImage}
//             />
//           ))}
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Create
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBlogPage;


import React, { useState } from 'react';
import styles from './addBlog.module.css';

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [images, setImages] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHashtagsChange = (e) => {
    setHashtags(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setImages([...images, ...imageFiles]);
  };

  const handleImageDeselect = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('hashtags', hashtags);
      images.forEach((image, index) => {
        formData.append('images', image);
      });

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

  return (
    <div className={styles.container}>
      <h2>Create Blog</h2>
      <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={handleTitleChange}
          className={styles.titleInput}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className={styles.titleInput}
        ></textarea>
        <input
          type="text"
          placeholder="Hashtags (comma-separated)"
          value={hashtags}
          onChange={handleHashtagsChange}
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
        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;

