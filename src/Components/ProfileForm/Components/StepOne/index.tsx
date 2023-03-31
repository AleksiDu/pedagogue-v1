import { SetStateAction, useEffect, useRef, useState } from "react";
import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import Select from "react-select";
import styles from ".././styles.module.css";

/**
 * Todo
 * Algolia Places API
 */

const StepOne = (props: { name: string }) => {
  const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const errRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState<string>("");
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = useState(false);

  const [birthDate, setBirthDate] = useState<string>("");

  const [gender, setGender] = useState<string>("");
  const options = [
    { label: "male", value: 1 },
    { label: "female", value: 2 },
  ];
  const selectedValues = ["male", "female"];

  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsValidFirstName(NAME_REGEX.test(firstName));
    setIsValidLastName(NAME_REGEX.test(lastName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName]);

  const handleGenderChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setGender(e.target.value);
  };

  const handleSubmit = () => {
    console.log("[SUBMIT]");
  };

  return (
    <div>
      {isSuccess ? (
        <section className={styles.registrarSection}>
          <h1>Success!</h1>
          <p>
            <a href="/login">Sign In</a>
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
          <form onSubmit={handleSubmit} className={styles.registrarForm}>
            <Input
              isValidInputType={isValidFirstName}
              isInputTypeFocus={isFirstNameFocus}
              name="First Name:"
              id="first-name"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
              required
              ariaInvalid={isValidFirstName ? "false" : "true"}
              ariaDescribedby="firstNameId-note"
              onFocus={() => setIsFirstNameFocus(true)}
              onBlur={() => setIsFirstNameFocus(false)}
              note=" Not A Valid First Name"
            />
            <Input
              isValidInputType={isValidLastName}
              isInputTypeFocus={isLastNameFocus}
              name="Last Name:"
              id="last-name"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
              required
              ariaInvalid={isValidLastName ? "false" : "true"}
              ariaDescribedby="lastNameId-note"
              onFocus={() => setIsLastNameFocus(true)}
              onBlur={() => setIsLastNameFocus(false)}
              note=" Not A Valid Last Name"
            />
            <Input
              name="Birth Date:"
              type="date"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setBirthDate(e.target.value)
              }
              value={birthDate}
              required
            />
            <br />
            Gender:
            <Select
              {...props}
              className={"genderSelectContainer"}
              classNamePrefix={"genderSelect"}
              options={options}
            />
          </form>
        </section>
      )}
    </div>
  );
};

export default StepOne;
