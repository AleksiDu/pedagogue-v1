import { FC } from "react";

interface ActionButtonsProps {
  currentStep: number;
  totalSteps: number;
  previousStep?: () => void;
  nextStep?: () => void;
  lastStep?: () => void;
}

const ActionButton: FC<ActionButtonsProps> = ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  lastStep,
}) => {
  const handleBack = () => {
    if (previousStep) {
      previousStep();
    }
  };

  const handleNext = () => {
    if (nextStep) {
      nextStep();
    }
  };

  const handleFinish = () => {
    if (lastStep) {
      lastStep();
    }
  };

  const renderBackButton = () => {
    if (currentStep > 1 && previousStep) {
      return (
        <button type="button" onClick={handleBack}>
          Back
        </button>
      );
    }
    return null;
  };

  const renderNextButton = () => {
    if (currentStep < totalSteps && nextStep) {
      return (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      );
    }
    return null;
  };

  const renderFinishButton = () => {
    if (currentStep === totalSteps && lastStep) {
      return (
        <button type="button" onClick={handleFinish}>
          Finish
        </button>
      );
    }
    return null;
  };

  return (
    <>
      {renderBackButton()}
      {renderNextButton()}
      {renderFinishButton()}
    </>
  );
};

export default ActionButton;
