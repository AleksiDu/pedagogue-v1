import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import ActionButton from "../ActionButton";
import styles from "../styles.module.css";

interface ConfirmProps {
  name: string;
  completeCallback: () => void;
  lastStep: () => void;
}

const StepConfirm: React.FC<ConfirmProps> = (props) => {
  const validate = () => {
    props.lastStep();
  };
  return (
    <div>
      {
        <section className={styles.registrarSection}>
          <p className={styles["err-msg"]} aria-live="assertive">
            {"errMsg"}
          </p>
          <h1>Summery</h1>
          <form className={styles.registrarForm}>
            <Input
              name="First Name:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <Input
              name="Last Name:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <Input
              name="Subject:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <Input
              name="Experience:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <Input
              name="Age:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <Input
              name="Gender:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <Input
              name="City:"
              type="text"
              value={props?.name}
              onChange={(e) => console.log(e)}
            />
            <ActionButton
              currentStep={3}
              totalSteps={3}
              previousStep={function (): void {
                throw new Error("Function not implemented.");
              }}
              nextStep={function (): void {
                throw new Error("Function not implemented.");
              }}
              lastStep={validate}
            />
          </form>
        </section>
      }
    </div>
  );
};

export default StepConfirm;
