import { useEffect, useState } from "react";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import StepConfirm from "./Components/Confirmation";
import StepOne from "./Components/StepOne/index";
import StepTwo from "./Components/StepTwo";

interface UserProps {
  firstName: any;
  lastName: any;
  birthDate: any;
  gender: any;
  city: any;
  subject: any;
  experience: any;
}

const ProfileForm = () => {
  const [stepWizard, setStepWizard] = useState<StepWizardProps | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState<UserProps>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    city: "",
    subject: "",
    experience: "",
  });

  const assignStepWizard = (instance: StepWizardProps) => {
    setStepWizard(instance);
  };

  const assignUser = (val: {}) => {
    console.log("parent receive user callback");
    console.log("log val", val);
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleStepChange = (e: { activeStep: number }) => {
    console.log("step change");
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("Done");
  };

  useEffect(
    () => console.log({ user, activeStep, stepWizard }),
    [activeStep, stepWizard, user]
  );
  console.log("prof", user?.firstName);
  return (
    <section>
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <StepOne
          name="one"
          nextStep={function (): void {
            throw new Error("Function not implemented.");
          }}
          userCallback={assignUser}
        />
        <StepTwo
          name="two"
          nextStep={function (): void {
            throw new Error("Function not implemented.");
          }}
          userCallback={assignUser}
        />
        <StepConfirm
          name={"name"}
          firstName={user.firstName}
          lastName={user.lastName}
          birthDate={user.birthDate}
          gender={user.gender}
          city={user.city}
          subject={user.subject}
          experience={user.experience}
          completeCallback={function (): void {
            throw new Error("Function not implemented.");
          }}
          lastStep={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </StepWizard>
    </section>
  );
};

export default ProfileForm;
