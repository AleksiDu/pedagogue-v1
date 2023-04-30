import { useEffect, useState } from "react";
import ActionButton from "../ActionButton";
import styles from "../styles.module.css";
import axios from "../../../../api/axios";
import { isAxiosError } from "axios";
import { access } from "fs";

interface ConfirmProps {
  name: string;
  firstName: any;
  lastName: any;
  birthDate: any;
  gender: any;
  city: any;
  subject: any;
  experience: any;
  image: any;

  completeCallback: (data: any) => void;
  lastStep: () => void;
  prevStep: () => void;
}
interface ErrorResponse {
  status?: number;
  detail: string;
  title?: string;
  // other properties of the error response object
}

interface Prop {
  name: string;
  value: any;
}

const StepConfirm: React.FC<ConfirmProps> = (props) => {
  const EDIT_INFO = `/api/Teacher/edit-info`;
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (props.image) {
      const objectUrl = URL.createObjectURL(props.image);
      setPreview(objectUrl);
    }
  }, [props.image]);

  console.log("uploaded image", props.image);

  const validate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", props.image);

      axios
        .post("/api/upload", formData) //TODO change post address!!!
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      const response = await axios.post(
        EDIT_INFO,
        JSON.stringify({
          accessToken: localStorage.getItem("accessToken"),
          firstName: props.firstName,
          lastName: props.lastName,
          birthDate: props.birthDate,
          gender: props.gender,
          city: props.city,
          subject: props.subject,
          experience: props.experience,
        }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, // <-- request should include cookies
        }
      );
      console.log(response);
      props.completeCallback(props); // Pass props data to parent component
      props.lastStep();
    } catch (err) {
      if (isAxiosError(err)) {
        const error: ErrorResponse | undefined = err?.response?.data as
          | ErrorResponse
          | undefined;
        const errLog =
          "[ CODE: " + error?.status + " : " + error?.detail + " ]";
        if (!err.response) {
          console.error("[No Server Response]");
        } else if (err.response.status === 400) {
          console.error(errLog);
        } else if (err.response.status === 401) {
          console.error(errLog);
        } else {
          console.error(errLog);
        }
      } else {
        // Handle other types of errors here
        console.log("Other error");
      }
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    props.prevStep();
  };

  const propArray: Prop[] = [
    { name: "First Name", value: props?.firstName },
    { name: "Last Name", value: props?.lastName },
    { name: "Birth Date", value: props?.birthDate },
    { name: "Gender", value: props?.gender?.label },
    { name: "City", value: props?.city?.label },
    { name: "Subject", value: props?.subject },
    { name: "Experience", value: props?.experience },
  ];

  return (
    <div>
      {
        <section className={styles.registrarSection}>
          <p className={styles["err-msg"]} aria-live="assertive">
            {"errMsg"}
          </p>
          <h1>{props.name}</h1>
          <form className={styles.registrarForm}>
            <img src={preview} alt="profile image" width="50" height="50" />
            {propArray.map((prop) => (
              <p key={prop.name}>
                <strong>{prop.name}: </strong>
                {prop.value}
              </p>
            ))}

            <ActionButton
              currentStep={3}
              totalSteps={3}
              previousStep={goBack}
              nextStep={validate}
              lastStep={validate}
            />
          </form>
        </section>
      }
    </div>
  );
};

export default StepConfirm;
