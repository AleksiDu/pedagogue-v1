import React, { useState } from "react";

import "./profileImageGallery.css";

interface Image {
  id: string;
  url: string;
  profilePhoto: boolean;
}

interface ProfileImageGalleryProps {
  images: Image[];
}

const ProfileImageGallery: React.FC<ProfileImageGalleryProps> = (props) => {
  const [images, setImages] = useState<Image[]>(props.images);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteImage, setDeleteImage] = useState<Image | null>(null);

  console.log(props);

  const openImage = (image: Image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const deleteImageConfirmation = (image: Image) => {
    setDeleteImage(image);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    // TODO delete operation  make an API request
    // TODO Once the delete operation is successful, update the images array

    // API call for deleting the image by ID
    const updatedImages = images.filter(
      (image) => image.id !== deleteImage!.id
    );

    // Update the images state with the updated array
    setImages(updatedImages);

    // Close the confirmation dialog
    setShowConfirmDelete(false);
  };

  return (
    <div>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image.id} className="image-wrapper">
            <img
              src={image.url}
              alt="User Profile Image"
              className={image.profilePhoto ? "profile-photo" : ""}
              onClick={() => openImage(image)}
            />
            <div className="image-options">
              <button onClick={() => deleteImageConfirmation(image)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal">
          <img src={selectedImage.url} alt="Selected Image" />
          <button className="close-button" onClick={closeImage}>
            X
          </button>
        </div>
      )}

      {showConfirmDelete && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this image?</p>
          <div className="confirmation-buttons">
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setShowConfirmDelete(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageGallery;
