import { useEffect, useRef, useState } from "react";
import Select, { ActionMeta } from "react-select";

import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import ActionButton from "../ActionButton";

import styles from "../../../../styles/FormStyles/styles.module.css";
import { customStyles } from "./customStyles";

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

  const [errMsg, setErrMsg] = useState("");

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

  useEffect(() => {
    setIsValidFirstName(NAME_REGEX.test(firstName));
    setIsValidLastName(NAME_REGEX.test(lastName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setStepOneState((prevState) => ({ ...prevState, firstName: value }));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setStepOneState((prevState) => ({ ...prevState, lastName: value }));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDate(value);
    setStepOneState((prevState) => ({ ...prevState, birthDate: value }));
  };

  const handleGenderSelectChange = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    if (actionMeta.action === "select-option") {
      const selectedOption = newValue as Option;
      setStepOneState((prevState) => ({
        ...prevState,
        genderSelect: selectedOption,
      }));
    }
  };

  const handleCitySelectChange = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    if (actionMeta.action === "select-option") {
      const selectedOption = newValue as Option;
      setStepOneState((prevState) => ({
        ...prevState,
        citySelect: selectedOption,
      }));
    }
  };

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
              onChange={handleFirstNameChange}
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
              onChange={handleLastNameChange}
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
              onChange={handleBirthDateChange}
              required
              value={birthDate}
            />
            <br />
            <label htmlFor="gender">Gender:</label>
            <Select
              styles={customStyles}
              options={genderOption}
              onChange={handleGenderSelectChange}
            />
            <label htmlFor="city">City:</label>
            <Select
              styles={customStyles}
              options={cityOption}
              onChange={handleCitySelectChange}
            />
            <ActionButton nextStep={validate} currentStep={1} totalSteps={3} />
          </form>
        </section>
      }
    </div>
  );
};

export default StepOne;
