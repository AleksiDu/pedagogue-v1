interface ActionButtonsProps {
  currentStep: number;
  totalSteps: number;
  previousStep: () => void;
  nextStep: () => void;
  lastStep: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
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
