import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Curriculum from "../../pages/Curriculum";
import ForgetPassword from "../RegistrationLoginCom/ForgetPassword";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import PasswordReset from "../RegistrationLoginCom/PasswordReset";
import PrivateRoutes from "../../utils/PrivateRoutes";
import Profile from "../../pages/Profile";
import Registration from "../../pages/Registration";
import SettingsPage from "../../pages/SettingsPage";
import LogoutButton from "./LogoutBtn";
import FourOhFourPage from "../../pages/404";
import ProfileImageGallery from "../ProfileForm/Components/ProfileImageGallery";

import { ThemeContext } from "../../context/ThemeContext";

import "./body.css";
import fetchProfileImage from "../../utils/fetchProfileImage ";

interface Image {
  id: string;
  profilePhoto: boolean;
  url: string;
}

const Body = () => {
  const [galleryImages, setGalleryImages] = useState<Image[] | undefined>();
  const [fetchedImages, setFetchedImages] = useState<Image[] | undefined>();

  const [imageId, setImageId] = useState<string>();

  const REGISTER_URL = "/registration";

  const location = useLocation();

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const userName = localStorage.getItem("username") ?? "";
  const accessToken = localStorage.getItem("accessToken") ?? "";
  const role = localStorage.getItem("role");

  useEffect(() => {
    switch (location.pathname) {
      case REGISTER_URL + "/Tutor":
      case REGISTER_URL + "/Student":
      case REGISTER_URL + "/Parent":
        break;
      default:
        localStorage.removeItem("activeBtn");
        break;
    }
  }, [location]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode === "true");
    }
  }, [setIsDarkMode]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!accessToken) {
          console.log("Access token not found.");
          return;
        }

        const images = await fetchProfileImage(Number(role), accessToken);

        if (images) {
          setFetchedImages(images);
        } else {
          // Handle the case when fetchProfileImage returns undefined
          console.log("Image not found.");
        }
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };
    fetchImage().catch(console.error);
  }, [accessToken, role, imageId]);

  useEffect(() => {
    if (fetchedImages) {
      setGalleryImages(fetchedImages);
    }
  }, [fetchedImages, imageId]);

  return (
    <>
      <section className={`landing-page  ${isDarkMode ? "dark-mode" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/*" element={<Registration />}></Route>
          <Route path="/login/*" element={<Login />}></Route>
          <Route path="/forgetpassword/*" element={<ForgetPassword />}></Route>
          <Route path="/resetpassword" element={<PasswordReset />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/profile/*" element={<Profile />} />
            <Route
              path="/settings/*"
              element={
                <SettingsPage userName={userName} accessToken={accessToken} />
              }
            />
            <Route
              path="/profileimage"
              element={
                <ProfileImageGallery
                  images={galleryImages}
                  setImageId={setImageId}
                />
              }
            />
          </Route>

          <Route path="/Curriculum/*" element={<Curriculum />}></Route>

          <Route path="*" element={<FourOhFourPage />} />
        </Routes>
      </section>
      <LogoutButton />
    </>
  );
};

export default Body;
