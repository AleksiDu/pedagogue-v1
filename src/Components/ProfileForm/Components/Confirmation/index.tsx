import { useEffect, useRef, useState } from "react";
import ActionButton from "../ActionButton";
import styles from "../../../../styles/FormStyles/styles.module.css";
import axios from "../../../../api/axios";
import { AxiosError } from "axios";
import Loader from "../../../Loader";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

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
  hashKey?: string;

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

interface Option {
  label: string;
  value: number;
}

const StepConfirm: React.FC<ConfirmProps> = (props) => {
  // TODO change Teacher to userRole
  const role = localStorage.getItem("role");

  let updatedUserRole = "";

  switch (Number(role)) {
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

  const EDIT_INFO = `/api/${updatedUserRole}/edit-info`;
  const errRef = useRef<HTMLDivElement>(null);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const birthYear = props.birthDate ? props.birthDate.split("-") : null;
  const year = birthYear
    ? new Date().getFullYear() - Number(birthYear[0])
    : null;

  const genderOption: Option[] = [
    { label: "male", value: 1 },
    { label: "female", value: 2 },
  ];

  const cityOption: Option[] = [
    { label: "Tbilisi", value: 1 },
    { label: "Kutaisi", value: 2 },
    { label: "Batumi", value: 3 },
  ];

  useEffect(() => {
    if (props.image) {
      if (typeof props.image === "string") {
        setImageURL(props.image);
      } else {
        const objectUrl = URL.createObjectURL(props.image);
        setImageURL(objectUrl);
      }
    }
  }, [props.image]);

  // Type guard function
  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError !== undefined && error.config !== undefined;
  };

  const validate = async () => {
    try {
      setLoading(true);
      if (accessToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }

      const formData = new FormData();
      formData.append("File", props.image);

      axios
        .post("/api/Photo/upload", formData, {
          headers: { "Content-Type": "multipart/from-data" },
        }) //TODO change post address!!!
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      const response = await axios.post(
        EDIT_INFO,
        JSON.stringify({
          firstName: props.firstName,
          lastName: props.lastName,
          age: year,
          birthday: props.birthDate,
          sex: props.gender.value,
          city: props.city.value,
          subject: props.subject,
          experience: props.experience,
        }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, // <-- request should include cookies
        }
      );
      console.log("response", response);
      props.completeCallback(props); // Pass props data to parent component
      props.lastStep();
      setIsSuccess(true);
    } catch (err) {
      if (isAxiosError(err)) {
        const error: ErrorResponse | undefined = err?.response?.data as
          | ErrorResponse
          | undefined;
        const errLog =
          "[ CODE: " + error?.status + " : " + error?.detail + " ]";
        if (!err.response) {
          console.error("[No Server Response]");
          setErrMsg("No Server Response");
        } else if (err.response.status === 400) {
          console.error(errLog);
          setErrMsg("Bad Request");
        } else if (err.response.status === 401) {
          console.error(errLog);
          setErrMsg("Invalid User");
        } else {
          console.error(errLog);
          setErrMsg("Something Went Wrong ");
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

  const genderLabel = genderOption.find(
    (option) => option.value === props?.gender?.value
  )?.label;

  const cityLabel = cityOption.find(
    (option) => option.value === props?.city?.value
  )?.label;

  const propArray: Prop[] = [
    { name: "First Name", value: props?.firstName },
    { name: "Last Name", value: props?.lastName },
    { name: "Birth Date", value: props?.birthDate },
    { name: "Gender", value: genderLabel },
    { name: "City", value: cityLabel },
    { name: "Subject", value: props?.subject },
    { name: "Experience", value: props?.experience },
  ];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : isSuccess ? (
        <section className={styles.registrarSection}>
          <h1>User profile created successfully</h1>
          <p>
            <Link to={"/"}>home</Link>
          </p>
        </section>
      ) : (
        <section className={styles.registrarSection}>
          <p
            ref={errRef}
            className={styles[errMsg ? "err-msg" : "offscreen"]}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>{props.name}</h1>
          <form className={styles.registrarForm}>
            {/* TODO change to imageKey  */}
            <Avatar
              key={"imageKey"}
              src={imageURL}
              size="60"
              style={{
                borderColor: "black",
                borderRadius: 4,
                borderStyle: "solid",
              }}
            />

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
      )}
    </div>
  );
};

export default StepConfirm;
