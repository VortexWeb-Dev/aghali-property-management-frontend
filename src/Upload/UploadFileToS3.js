import axios from "axios";

const handleFileUpload = async (e) => {
  const files = Array.from(e.target.files);
  try {
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const { data } = await axios.post(
          "http://3.110.171.244/api/files/presigned-url",
          {
            key: file.name,
            contentType: file.type,
          }
        );

        // Upload file to S3 using the pre-signed URL
        await axios.put(data.presignedUrl.presignedUrl, file, {
          headers: { "Content-Type": file.type },
        });

        return `https://aghali.s3.ap-south-1.amazonaws.com/${file.name}`;
        // return data.publicUrl; // Store the public URL
      })
    );

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const nonImageFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );

    setFormData((prev) => ({
      ...prev,
      ...(imageFiles.length > 0 && { photos: uploadedUrls }),
      ...(nonImageFiles.length > 0 && { attachments: uploadedUrls }),
    }));
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};
