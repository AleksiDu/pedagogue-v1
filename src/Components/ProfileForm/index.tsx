import { useState } from "react";
import StepWizard from "react-step-wizard";
import StepConfirm from "./Components/Confirmation";
import StepOne from "./Components/StepOne/index";
import StepTwo from "./Components/StepTwo";

const ProfileForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section>
      <StepWizard>
        <StepOne
          name="one"
          nextStep={function (): void {
            throw new Error("Function not implemented.");
          }}
          userCallback={function (val: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <StepTwo />
        <StepConfirm />
      </StepWizard>
    </section>
  );
};

export default ProfileForm;
