import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCardClip,
  faRectangleXmark,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./profileImageGallery.css";

import Loader from "../../../Loader";

import axios from "../../../../api/axios";

interface Image {
  id: string;
  url: string;
  profilePhoto: boolean;
}

interface ProfileImageGalleryProps {
  images?: Image[];
}

const ProfileImageGallery: FC<ProfileImageGalleryProps> = ({
  images: galleryImages,
}) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteImage, setDeleteImage] = useState<Image | null>(null);

  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (galleryImages) {
      setImages(galleryImages);
      setLoading(false);
    }
  }, [galleryImages]);

  const handleImageOpen = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleToSetProfileImage = async (image: Image) => {
    const updatedUserRole = getUserRole();
    const updatedImage = { ...image, profilePhoto: true };

    axios
      .put(`/api/${updatedUserRole}/${image.id}`, updatedImage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Profile photo updated successfully");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating profile photo:", error);
      });
  };

  const handleDeleteImageConfirmation = (image: Image) => {
    setDeleteImage(image);
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirmation = () => {
    if (deleteImage) {
      console.log(deleteImage);
      axios
        .delete(`/api/Photo/delete`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            photos: [deleteImage.id],
          },
        })
        .then((response) => {
          console.log("Profile photo deleted successfully", response);

          const updatedImages = images.filter(
            (image) => image.id !== deleteImage?.id
          );
          setImages(updatedImages);
          setShowConfirmDelete(false);
        })
        .catch((error) => {
          console.error("Error deleting profile photo:", error);
          setShowConfirmDelete(false);
        });
    }
  };

  const getUserRole = () => {
    switch (Number(userRole)) {
      case 1:
        return "Tutor";
      case 2:
        return "Student";
      case 3:
        return "Parent";
      default:
        return "default";
    }
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
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  className="set-button"
                  onClick={() => handleToSetProfileImage(image)}
                >
                  <FontAwesomeIcon icon={faIdCardClip} />
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
              <FontAwesomeIcon icon={faRectangleXmark} />
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
