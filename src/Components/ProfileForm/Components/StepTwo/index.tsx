import { useEffect, useRef, useState } from "react";
import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import ActionButton from "../ActionButton";
import styles from "../../../../styles/RegistrationProfileStyles/styles.module.css";

type TwoProps = {
  name: string;
  userCallback: (val: any) => void;
  nextStep: () => void;
  prevStep: () => void;
};

interface StepTwoState {
  subject: string;
  experience?: number;
  image?: File;
}

const StepTwo: React.FC<TwoProps> = (props) => {
  const errRef = useRef<HTMLDivElement>(null);

  const [experience, setExperience] = useState<number>();
  const [subject, setSubject] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [errMsg, setErrMsg] = useState("");
  const [stepTwoState, setStepTwoState] = useState<StepTwoState>({
    subject: "",
    experience: undefined,
    image: undefined,
  });

  useEffect(() => {
    setErrMsg("");
  }, [experience, subject, selectedImage]);

  const validate = () => {
    if (!experience) {
      setErrMsg("Please enter a year");
    }
    if (!subject) {
      setErrMsg("Please enter a subject");
    }
    if (!selectedImage) {
      setErrMsg("Please upload an image");
    }

    // Call next step if all validation passes
    props.nextStep();
    props.userCallback(stepTwoState === undefined ? "" : stepTwoState);
  };

  const goBack = () => {
    props.prevStep();
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
              name={"Subject:"}
              id="subject"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setSubject(e.target.value);
                setStepTwoState({ ...stepTwoState, subject: e.target.value });
              }}
              value={subject}
              required
            />
            <Input
              name={"Experience:"}
              id="experience"
              type="number"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.valueAsNumber;
                if (!isNaN(value)) {
                  setExperience(value);
                  setStepTwoState({
                    ...stepTwoState,
                    experience: value === undefined ? 0 : value,
                  });
                }
              }}
              value={experience === undefined ? "" : experience.toFixed(0)}
              required
            />
            <Input
              name={"Upload an image:"}
              id="upload"
              type="file"
              autoComplete="off"
              accept="image/*"
              onChange={(e) => {
                const value = e.target?.files?.[0];
                setSelectedImage(value);
                setStepTwoState({
                  ...stepTwoState,
                  image: value === undefined ? undefined : value, //TODO undefined change default image!
                });
              }}
              required
            />
            <ActionButton
              nextStep={validate}
              currentStep={2}
              totalSteps={3}
              previousStep={goBack}
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

export default StepTwo;
