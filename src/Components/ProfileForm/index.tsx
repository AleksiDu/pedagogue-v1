import StepOne from "./Components/StepOne/index";

const ProfileForm = () => {
  return (
    <section>
      <StepOne
        name="one"
        nextStep={function (): void {
          throw new Error("Function not implemented.");
        }}
        userCallback={function (val: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    </section>
  );
};

export default ProfileForm;
