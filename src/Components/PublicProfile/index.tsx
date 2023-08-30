import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";

import TutorNotFound from "./TutorNotFound";
import AvatarContainer from "../AvatarContainer";

interface Tutor {
  city: number;
  email: string;
  experience: number;
  images: Image[];
  firstName: string;
  lastName: string;
  rating: number;
  sex: number;
  subject: string;
}

interface Image {
  id: string;
  profilePhoto: boolean;
  url: string;
}

const PublicProfile = () => {
  const { tutorId } = useParams();
  const [tutorData, setTutorData] = useState<Tutor | null>(null);

  useEffect(() => {
    console.log(tutorId);
    axios
      .post(`/api/Tutor/get-teachers`, { email: tutorId })
      .then((response) => {
        const matchedTutor = response.data.find(
          (tutor: Tutor) => tutor.email === tutorId
        );

        console.log(matchedTutor);
        if (matchedTutor) {
          setTutorData(matchedTutor);
        } else {
          console.log("Tutor not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching tutor data:", error);
      });
  }, [tutorId]);

  return (
    <div>
      {tutorData ? (
        <>
          {tutorData.images
            .filter((image) => image.profilePhoto)
            .map((image) => (
              <AvatarContainer
                key={image.id}
                id={image.id}
                src={image.url}
                alt={`Tutor ${tutorData.firstName} ${tutorData.lastName}`}
                className={""}
                size={"40"}
                isLoggedIn={true}
              />
            ))}
          <h2>Tutor Profile</h2>
          <p>First Name: {tutorData.firstName}</p>
          <p>Last Name: {tutorData.lastName}</p>
          <p>Email: {tutorData.email}</p>
          <p>City: {tutorData.city}</p>
          <p>Experience: {tutorData.experience}</p>
          <p>Rating: {tutorData.rating}</p>
          <p>Sex: {tutorData.sex}</p>
          <p>Subject: {tutorData.subject}</p>
          {/* Render images */}
        </>
      ) : (
        <TutorNotFound />
      )}
    </div>
  );
};

export default PublicProfile;
