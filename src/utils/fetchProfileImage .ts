import axios from "../api/axios";

interface ProfileImage {
  id: string;
  profilePhoto: boolean;
  url: string;
}

interface ProfileResponse {
  images: ProfileImage[];
}

const fetchProfileImage = async (
  userRole: number,
  accessToken: string
): Promise<ProfileImage[] | undefined> => {
  try {
    let updatedUserRole = "";
    switch (userRole) {
      case 1:
        updatedUserRole = "Tutor";
        break;
      case 2:
        updatedUserRole = "Student";
        break;
      case 3:
        updatedUserRole = "Parent";
        break;
      default:
        updatedUserRole = "default";
        break;
    }

    const response = await axios.get<ProfileResponse>(
      `/api/${updatedUserRole}/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { images } = response.data;

    console.log("images", images);

    if (images) {
      return images;
    }
  } catch (error) {
    console.log("Error fetching image:", error);
    throw error;
  }
};

export default fetchProfileImage;
