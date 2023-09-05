import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";

import TutorNotFound from "./TutorNotFound";
import StepConfirm from "../ProfileForm/Components/Confirmation";

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
          <StepConfirm
            name={"Tutor Profile"}
            firstName={tutorData.firstName}
            lastName={tutorData.lastName}
            birthDate={tutorData.lastName}
            gender={tutorData.sex}
            city={tutorData.city}
            subject={tutorData.subject}
            experience={tutorData.experience}
            image={"https://img.icons8.com/ios/50/user--v1.png"}
            imageKey="--v1"
            images={tutorData.images}
            rating={tutorData.rating}
            className="display-contact"
            completeCallback={function (data: any): void {
              throw new Error("Function not implemented.");
            }}
            lastStep={function (): void {
              throw new Error("Function not implemented.");
            }}
            prevStep={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      ) : (
        <TutorNotFound />
      )}
    </div>
  );
};

export default PublicProfile;
