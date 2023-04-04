import ActionButton from "../ActionButton";

const StepConfirm = () => {
  return (
    <div>
      Step Confirm
      <ActionButton
        currentStep={3}
        totalSteps={3}
        previousStep={function (): void {
          throw new Error("Function not implemented.");
        }}
        nextStep={function (): void {
          throw new Error("Function not implemented.");
        }}
        lastStep={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default StepConfirm;
