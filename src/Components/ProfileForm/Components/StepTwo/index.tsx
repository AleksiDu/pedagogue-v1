import ActionButton from "../ActionButton";

const StepTwo = () => {
  return (
    <div>
      Step Two
      <ActionButton
        currentStep={2}
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

export default StepTwo;
