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
import AddImage from "./AddImage";

interface Image {
  id: string;
  url: string;
  profilePhoto: boolean;
}

interface ProfileImageGalleryProps {
  images?: Image[];
  setImageId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ProfileImageGallery: FC<ProfileImageGalleryProps> = ({
  images: galleryImages,
  setImageId,
}) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteImage, setDeleteImage] = useState<Image | null>(null);

  const accessToken = localStorage.getItem("accessToken");

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

  const handleDeleteImageConfirmation = (image: Image) => {
    setDeleteImage(image);
    setShowConfirmDelete(true);
  };

  const handleToSetProfileImage = async (image: Image) => {
    try {
      const response = await axios.put(
        `/api/Photo/update-profile`,
        { photoId: image.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Profile photo updated successfully");
      console.log(response);

      // Update the profilePhoto flag for the selected image
      const updatedImages = images.map((img) => ({
        ...img,
        profilePhoto: img.id === image.id,
      }));

      setImageId(image.id);
      setImages(updatedImages); // Trigger re-render by updating the state
      localStorage.setItem("ImageID", image.id);
    } catch (error) {
      console.error("Error updating profile photo:", error);
    }
  };

  const handleDeleteConfirmation = async () => {
    if (deleteImage) {
      try {
        const response = await axios.delete(`/api/Photo/delete`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            photos: [deleteImage.id],
          },
        });
        console.log("Profile photo deleted successfully", response);

        const updatedImages = images.filter(
          (image) => image.id !== deleteImage?.id
        );
        setImages(updatedImages);
        setShowConfirmDelete(false);
        setImageId(deleteImage.id);
      } catch (error) {
        console.error("Error deleting profile photo:", error);
        setShowConfirmDelete(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image.id} className={`image-wrapper`}>
              <img
                src={image.url}
                alt={`User Profile ${image.id}`}
                className={`${image.profilePhoto ? "profile-photo" : ""}`}
                onClick={() => handleImageOpen(image)}
              />
              <div className="image-options">
                <span
                  className="hover-text"
                  data-hover="Delete"
                  onClick={() => handleDeleteImageConfirmation(image)}
                >
                  <button>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </span>
                <span
                  className="hover-text"
                  data-hover="Set to Profile"
                  onClick={() => handleToSetProfileImage(image)}
                >
                  <button className="set-button">
                    <FontAwesomeIcon icon={faIdCardClip} />
                  </button>
                </span>
              </div>
            </div>
          ))}
          <AddImage setImageId={setImageId} />
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
