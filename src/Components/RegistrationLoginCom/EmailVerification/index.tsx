import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import Loader from "../../Loader";
import SuccessMessage from "../MessageWithAction";

import axios from "../../../api/axios";

import styles from "../../../styles/FormStyles/styles.module.css";

interface VerificationParams {
  email?: string;
  verificationCode?: string;
  [key: string]: string | undefined;
}

const EmailVerification = () => {
  const { email = "", verificationCode = "" } = useParams<VerificationParams>();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      const verificationUrl = `/api/authentication/verify?email=${encodeURIComponent(
        email
      )}&verificationCode=${encodeURIComponent(verificationCode)}`;
      await axios.get(verificationUrl);
      setIsSuccess(true);
    } catch (err) {
      const error = err as AxiosError<unknown>;
      if (error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.registrarSection}>
      {loading ? (
        <Loader />
      ) : isSuccess ? (
        <SuccessMessage
          to={"/login"}
          comment="Email was Successfully Verified"
          nextLine={true}
          text="Login"
        />
      ) : (
        <>
          <p>An error occurred while verifying your email: {error}</p>
          <p>Please try again later.</p>
        </>
      )}
    </section>
  );
};

export default EmailVerification;
