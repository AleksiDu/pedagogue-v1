import { useState } from "react";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import StepConfirm from "./Components/Confirmation";
import StepOne from "./Components/StepOne/index";
import StepTwo from "./Components/StepTwo";

interface UserProps {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  genderSelect?: { label: string; value: number };
  citySelect?: { label: string; value: number };
  subject?: string;
  experience?: number;
  image?: File;
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
  const [user, setUser] = useState<UserProps>({});

  const assignStepWizard = (instance: StepWizardProps) => {
    setStepWizard(instance);
  };

  const assignUser = (val: {}) => {
    console.log("parent receive user callback");
    console.log("val", val);
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
    console.log("finish");
    alert("Done");
  };

  return (
    <section>
      <StepWizard
        instance={assignStepWizard}
        onStepChange={handleStepChange}
        isHashEnabled={true}
      >
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
          name="confirm"
          firstName={user.firstName}
          lastName={user.lastName}
          birthDate={user.birthDate}
          gender={user.genderSelect}
          city={user.citySelect}
          subject={user.subject}
          experience={user.experience}
          image={user.image}
          completeCallback={assignUser}
          prevStep={handleBack}
          lastStep={handleComplete}
          hashKey={"confirm"}
        />
      </StepWizard>
    </section>
  );
};

export default ProfileForm;
