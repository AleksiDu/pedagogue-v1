const ActionButtons = (props: {
  previousStep: () => void;
  nextStep: () => void;
  lastStep: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div>
      {props.currentStep > 1 && <button onClick={handleBack}>Back</button>}
      {props.currentStep < props.totalSteps && (
        <button onClick={handleNext}>Next</button>
      )}
      {props.currentStep === props.totalSteps && (
        <button onClick={handleFinish}>Finish</button>
      )}
    </div>
  );
};

export default ActionButtons;
