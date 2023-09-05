import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import MessageWithAction from "../RegistrationLoginCom/MessageWithAction";
import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";

import styles from "./styles.module.css";

interface ContactData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { tutorId } = useParams<{ tutorId: string }>(); // Define the type for tutorId
  const REGISTER_URL = `api/authentication/register`;
  console.log(tutorId);

  const [contactData, setContactData] = useState<ContactData | undefined>();
  const [errMsg, setErrMsg] = useState<string>(""); // Initialize errMsg with an empty string
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  };

  const isValidMobile = (mobile: string) => {
    return /^(?!\+995)\+?\d{9}\s?\d{9}\s?\d{9}\s?\d{9}\s?\d{9}$|^\d{9}$/.test(
      mobile
    );
  };

  const validateField = (field: string, value: string) => {
    if (value.length <= 0) {
      return `${field} is required field.`; // Use string template for the message
    } else {
      if (field === "email") {
        if (!isValidEmail(value)) return "Invalid Email.";
      } else if (field === "mobile") {
        if (!isValidMobile(value)) return "Invalid Mobile Number.";
      } else {
        return "";
      }
    }
    return ""; // Return an empty string if no error is found
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Use React.FocusEvent<HTMLInputElement>
    setErrMsg(validateField(event.target.name, event.target.value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Remove non-digit characters from the mobile number
      const cleanedValue = value.replace(/\D/g, "");

      setContactData((prevData) => ({
        ...prevData!,
        [name]: cleanedValue,
      }));
    } else {
      setContactData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let isValid = false;

    if (
      contactData?.firstName &&
      contactData?.lastName &&
      contactData?.mobile &&
      contactData?.email &&
      contactData?.message
    ) {
      setIsSuccess(true);
      isValid = true;
    } else {
      setIsSuccess(false);
    }

    return isValid;
  };
  const renderForm = () => {
    return (
      <section className={styles.registrarSection}>
        <p
          className={styles[errMsg ? "err-msg" : "offscreen"]}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1> Contact to {tutorId} </h1>
        <form
          onSubmit={() => handleSubmit}
          className={styles.registrarForm}
          autoComplete="off"
        >
          <Input
            inputType={""}
            name="Email:"
            id="email"
            type="email"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            isValidInputType={false}
            onBlur={() => handleBlur}
            value={contactData?.email}
            required
            ariaDescribedby="eid-note"
            note=" Not a Valid email"
          />
          <button disabled={!isValidEmail}>Send</button>
        </form>

        <p>
          <span className={"styles.line"}>
            <Link to={"/home"}>Go Home !</Link>
          </span>
        </p>
      </section>
    );
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : isSuccess ? (
        <MessageWithAction
          to={"/login"}
          nextLine={true}
          className={"styles.registrarSection"}
          comment="Check Email for Verification"
          text="Sign In"
        />
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default Contact;
