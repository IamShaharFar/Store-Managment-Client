import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/inventory/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );
      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}

export default ImageUpload;
