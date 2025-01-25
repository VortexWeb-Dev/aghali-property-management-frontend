
async function uploadFileToS3(presignedUrl, file, fileType) {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType, // Ensure the Content-Type matches what S3 expects
        },
        body: file, // Upload the file directly
      });
  
      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  
  // Example Usage:
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0]; // Get the file from the input
  const presignedUrl = 'https://example-s3-presigned-url'; // Replace with the pre-signed URL you received
  uploadFileToS3(presignedUrl, file, file.type);
  