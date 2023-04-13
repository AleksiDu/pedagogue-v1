interface ActionButtonsProps {
  currentStep: number;
  totalSteps: number;
  previousStep: () => void;
  nextStep: () => void;
  lastStep: () => void;
}

const ActionButton: React.FC<ActionButtonsProps> = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    console.log("handleFinish", props);
    props.lastStep();
  };

  return (
    <>
      {props.currentStep > 1 && (
        <button type="button" onClick={handleBack}>
          Back
        </button>
      )}
      {props.currentStep < props.totalSteps && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
      {props.currentStep === props.totalSteps && (
        <button type="button" onClick={handleFinish}>
          Finish
        </button>
      )}
    </>
  );
};

export default ActionButton;
