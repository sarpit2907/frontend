"use client";

import React, { useState } from 'react';
import InteractivePlot from './InteractivePlot';

const FileUploadButton: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false); // Loader state
  const [buttonText, setButtonText] = useState<string>("Upload File");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setButtonText("Change File"); // Update button text to "Change File"
      console.log("File selected:", file.name);
      handleUpload(file); // Automatically upload when a file is selected
    } else {
      console.log("No file selected");
    }
  };

  const handleUpload = (file: File) => {
    console.log(`Uploading file: ${file.name}`);
    setIsUploading(true); // Show loader
    // Simulate file upload and backend processing for 2 minutes
    setTimeout(() => {
      setIsUploading(false); // Hide loader after 2 minutes
      // alert(`File ${file.name} processed successfully!`);
    }, 120000);
  };

  return (
    <>
    <div className="file-upload-container z-[50]" style={{ textAlign: 'center' }}>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input
      />
      <label htmlFor="file-upload">
        <button
          className="upload-btn"
          style={{
            background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.7), rgba(69, 123, 157, 0.7))',
            color: '#ffffff',
            padding: '12px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '50px',
            border: '2px solid rgba(168, 218, 220, 0.6)',
            cursor: 'pointer',
            marginTop: '30px',
            boxShadow: '0px 6px 20px rgba(168, 218, 220, 0.3)',
            transition: 'all 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0px 10px 25px rgba(168, 218, 220, 0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0px 6px 20px rgba(168, 218, 220, 0.3)')}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {buttonText}
          {/* Glow effect */}
          <div
            className="glow"
            style={{
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent)',
              opacity: '0',
              transition: 'opacity 0.4s ease',
            }}
          />
        </button>
      </label>

      {/* Loader */}
      {isUploading && (
        <div style={{ marginTop: '20px' }}>
          {/* <p style={{ color: '#ffffff' }}>Processing... Please wait for 2 minutes.</p> */}
          <div className="loader" style={{ display: 'inline-block', marginTop: '10px' }}>
            <div
              className="spinner"
              style={{
                border: '6px solid rgba(255, 255, 255, 0.1)',
                borderTop: '6px solid #0d6efd',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .upload-btn:hover .glow {
          opacity: 1;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    <InteractivePlot/>
    </>
  );
};

export default FileUploadButton;
