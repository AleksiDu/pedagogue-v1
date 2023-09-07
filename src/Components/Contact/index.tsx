import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import MessageWithAction from "../RegistrationLoginCom/MessageWithAction";
import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";

import styles from "./styles.module.css";
import axios from "../../api/axios";

interface ContactData {
  mobile: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { tutorId } = useParams<{ tutorId: string }>();
  const accessToken = localStorage.getItem("accessToken");
  const REGISTER_URL = `api/authentication/register`;
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const MOBILE_REGEX =
    /^(?:\+995)?\s?(5\d{1,2})\s?(\d{2})\s?(\d{2})\s?(\d{2})$/;

  const userEmailRef = useRef<HTMLInputElement>(null);
  const userMobileRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);

  const [mobile, setMobile] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [isMobileFocus, setIsMobileFocus] = useState(false);

  const [message, setMessage] = useState("");
  const [isMessageFocus, setIsMessageFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  // Ensures that the email input field is automatically focused when the component is initially rendered
  useEffect(() => {
    if (userEmailRef.current) {
      userEmailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
    setIsValidMobile(MOBILE_REGEX.test(mobile));
    setErrMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, mobile]);

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/Messaging/send-meesage",
        JSON.stringify({
          email,
          phone: mobile,
          message,
          recepientRole: 1,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);

      setIsSuccess(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderForm = () => {
    return (
      <section className={styles.registrarSection}>
        <p
          ref={errRef}
          className={styles[errMsg ? "err-msg" : "offscreen"]}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1> Contact to {tutorId} </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
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
              setEmail(e.target.value);
            }}
            isValidInputType={isValidEmail}
            isInputTypeFocus={isEmailFocus}
            onFocus={() => setIsEmailFocus(true)}
            onBlur={() => setIsEmailFocus(false)}
            value={email}
            required
            ariaDescribedby="eid-note"
            note=" Not a Valid email"
            PropRef={userEmailRef}
          />

          <Input
            inputType={""}
            name="Mobile:"
            id="mobile"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            isValidInputType={isValidMobile}
            isInputTypeFocus={isMobileFocus}
            onFocus={() => setIsMobileFocus(true)}
            onBlur={() => setIsMobileFocus(false)}
            value={mobile}
            required
            ariaDescribedby="mobile-note"
            note=" Not a Valid mobile number"
            PropRef={userMobileRef}
          />
          <label htmlFor="text">Write to {tutorId}:</label>
          <textarea
            id="text"
            name="writeTo"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onFocus={() => setIsMessageFocus(true)}
            onBlur={() => setIsEmailFocus(false)}
          ></textarea>

          <button disabled={!isValidEmail || !isValidMobile}>Send</button>
        </form>

        <p>
          <span className={"styles.line"}>
            <Link to={"/"}>Go Home !</Link>
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
          to={"/mailbox"}
          nextLine={true}
          className={"styles.registrarSection"}
          comment={`Message was sand to ${tutorId}`}
          text="Go Mailbox"
        />
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default Contact;
