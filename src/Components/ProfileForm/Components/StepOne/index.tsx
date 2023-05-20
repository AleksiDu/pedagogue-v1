import { useEffect, useRef, useState } from "react";
import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import Select, { StylesConfig } from "react-select";
import styles from "../../../../styles/RegistrationProfileStyles/styles.module.css";
import ActionButton from "../ActionButton";

/**
 * Todo
 * Possible Tutor documentation check,
 * Geolocation, auto address
 */

interface OneProps {
  nextStep: () => void;
  userCallback: (stepOneState: object) => void;
  name: string;
}

interface Option {
  label: string;
  value: number;
}

interface StepOneState {
  firstName: string;
  lastName: string;
  birthDate: string;
  genderSelect: Option;
  citySelect: Option;
}

const StepOne: React.FC<OneProps> = (props) => {
  const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const errRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState<string>("");
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isLastNameFocus, setIsLastNameFocus] = useState(false);

  const [birthDate, setBirthDate] = useState<string>("");

  const [stepOneState, setStepOneState] = useState<StepOneState>({
    firstName: "",
    lastName: "",
    birthDate: "",
    genderSelect: { label: "", value: 0 },
    citySelect: { label: "", value: 0 },
  });

  const genderOption: Option[] = [
    { label: "male", value: 1 },
    { label: "female", value: 2 },
  ];

  const cityOption: Option[] = [
    { label: "Tbilisi", value: 1 },
    { label: "Kutaisi", value: 2 },
    { label: "Batumi", value: 3 },
  ];

  const [errMsg, setErrMsg] = useState("");

  const customStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      flexGrow: 1,
      paddingBottom: "1rem",
    }),
    control: (provided) => ({
      ...provided,
      fontSize: "22px",
      borderRadius: "0.5rem",
      borderWidth: "2px",
      borderColor:
        "-internal-light-dark(rgb(118, 118, 118),rgb(133, 133, 133))",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
      color: "#000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "black",
      marginTop: "-18px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(118, 118, 118, 0.4)"
        : state.isSelected
        ? "rgb(118, 118, 118)"
        : "white",
      ":hover": {
        color: "white",
        backgroundColor: "rgba(118, 118, 118, 0.4)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
  };

  useEffect(() => {
    setIsValidFirstName(NAME_REGEX.test(firstName));
    setIsValidLastName(NAME_REGEX.test(lastName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName]);

  const validate = () => {
    if (!isValidFirstName) {
      setErrMsg("Please enter a valid first name");
      return;
    }
    if (!isValidLastName) {
      setErrMsg("Please enter a valid last name");
      return;
    }

    // Call next step if all validation passes
    props.nextStep();
    props.userCallback(stepOneState);
  };

  return (
    <div>
      {
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
            <Input
              inputType={firstName}
              isValidInputType={isValidFirstName}
              isInputTypeFocus={isFirstNameFocus}
              name="First Name:"
              id="first-name"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setFirstName(e.target.value);
                setStepOneState({ ...stepOneState, firstName: e.target.value });
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
              inputType={lastName}
              isValidInputType={isValidLastName}
              isInputTypeFocus={isLastNameFocus}
              name="Last Name:"
              id="last-name"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setLastName(e.target.value);
                setStepOneState({ ...stepOneState, lastName: e.target.value });
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
              id="birth-date"
              type="date"
              onChange={(e) => {
                setBirthDate(e.target.value);
                setStepOneState({ ...stepOneState, birthDate: e.target.value });
              }}
              required
              value={birthDate}
            />
            <br />
            <label htmlFor="gender">Gender:</label>
            <Select
              styles={customStyles}
              options={genderOption}
              onChange={(newValue: unknown) => {
                console.log(newValue);
                const selectedOption = newValue as Option;
                setStepOneState({
                  ...stepOneState,
                  genderSelect: selectedOption,
                });
              }}
            />
            <label htmlFor="city">City:</label>
            <Select
              styles={customStyles}
              options={cityOption}
              onChange={(newValue: unknown) => {
                const selectedOption = newValue as Option;
                setStepOneState({
                  ...stepOneState,
                  citySelect: selectedOption,
                });
              }}
            />
            <ActionButton
              nextStep={validate}
              currentStep={1}
              totalSteps={3}
              previousStep={function (): void {
                throw new Error("Function not implemented.");
              }}
              lastStep={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </form>
        </section>
      }
    </div>
  );
};

export default StepOne;
