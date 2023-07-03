import React, { useEffect, useState } from "react";

import "./profileImageGallery.css";
import Loader from "../../../Loader";

interface Image {
  id: string;
  url: string;
  profilePhoto: boolean;
}

interface ProfileImageGalleryProps {
  images: Image[];
}

const ProfileImageGallery: React.FC<ProfileImageGalleryProps> = ({
  images: galleryImages,
}) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteImage, setDeleteImage] = useState<Image | null>(null);

  useEffect(() => {
    setImages(galleryImages);
    setLoading(false);
  }, [galleryImages]);

  const handleImageOpen = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleDeleteImageConfirmation = (image: Image) => {
    setDeleteImage(image);
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirmation = () => {
    // TODO delete operation  make an API request
    // TODO Once the delete operation is successful, update the images array

    // API call for deleting the image by ID
    const updatedImages = images.filter(
      (image) => image.id !== deleteImage?.id
    );

    // Update the images state with the updated array
    setImages(updatedImages);

    // Close the confirmation dialog
    setShowConfirmDelete(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image.id} className="image-wrapper">
              <img
                src={image.url}
                alt={`User Profile ${image.id}`}
                className={image.profilePhoto ? "profile-photo" : ""}
                onClick={() => handleImageOpen(image)}
              />
              <div className="image-options">
                <button onClick={() => handleDeleteImageConfirmation(image)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="image-modal">
          <div className="image-modal-wrapper">
            <img src={selectedImage.url} alt="Selected" />

            <button className="close-button" onClick={handleCloseImage}>
              X
            </button>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this image?</p>
          <div className="confirmation-buttons">
            <button onClick={handleDeleteConfirmation}>Yes</button>
            <button onClick={() => setShowConfirmDelete(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileImageGallery;
