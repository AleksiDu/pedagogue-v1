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

interface ExtendedStepWizardProps extends StepWizardProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

const ProfileForm = () => {
  const [stepWizard, setStepWizard] = useState<ExtendedStepWizardProps | null>(
    null
  );

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

    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    stepWizard?.previousStep?.();
  };

  const handleStepChange = (e: { activeStep: number }) => {
    console.log("step change");
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("Done");
  };

  return (
    <section>
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <StepOne
          name="one"
          nextStep={() => stepWizard?.nextStep?.()}
          userCallback={assignUser}
        />
        <StepTwo
          name="two"
          nextStep={() => stepWizard?.nextStep?.()}
          userCallback={assignUser}
          prevStep={handleBack}
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
          completeCallback={() => stepWizard?.nextStep?.()}
          prevStep={handleBack}
          lastStep={handleComplete}
        />
      </StepWizard>
    </section>
  );
};

export default ProfileForm;
