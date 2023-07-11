import { FC, useState, ChangeEvent } from "react";
import addImage from "../../../../assets/camera-add-svgrepo-com.svg";
import axios from "../../../../api/axios";
import { access } from "fs";

const AddImage: FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const accessToken = localStorage.getItem("accessToken");
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("File", file);

      axios
        .post("/api/Photo/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="uploaded" className="add-photo" />
      ) : (
        <label htmlFor="upload-input">
          <img src={addImage} alt="add" className="add-photo" />
        </label>
      )}
      <input
        id="upload-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default AddImage;
