import React, { useState } from 'react';
import './UploadAvatar.css';
import { uploadAvatarImage } from '../../managers/userProfileManager';

export const UploadAvatar = ({ id, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadAvatarImage(id, formData);

      if (response.ok) {
        const data = await response.json();
        setMessage(data.Message);
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.Message || 'An error occurred.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="upload-wrapper">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload Avatar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
