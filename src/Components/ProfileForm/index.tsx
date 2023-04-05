import { useEffect, useState } from "react";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import StepConfirm from "./Components/Confirmation";
import StepOne from "./Components/StepOne/index";
import StepTwo from "./Components/StepTwo";

const ProfileForm = () => {
  const [stepWizard, setStepWizard] = useState<StepWizardProps | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState({});

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
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("Done");
  };

  useEffect(
    () => console.log({ user, activeStep, stepWizard }),
    [activeStep, stepWizard, user]
  );

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
