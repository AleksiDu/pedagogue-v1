import Input from "../../../RegistrationLoginCom/RegisterForm/Components/Input";
import ActionButton from "../ActionButton";
import styles from "../styles.module.css";

interface ConfirmProps {
  name: any;
  firstName: any;
  lastName: any;
  birthDate: any;
  gender: any;
  city: any;
  subject: any;
  experience: any;

  completeCallback: () => void;
  lastStep: () => void;
}

interface Prop {
  name: string;
  value: any;
}

const StepConfirm: React.FC<ConfirmProps> = (props) => {
  const validate = () => {
    props.lastStep();
  };

  const propArray: Prop[] = [
    { name: "First Name", value: props?.firstName },
    { name: "Last Name", value: props?.lastName },
    { name: "Birth Date", value: props?.birthDate },
    { name: "Gender", value: props?.gender },
    { name: "City", value: props?.city },
    { name: "Subject", value: props?.subject },
    { name: "Experience", value: props?.experience },
  ];

  return (
    <div>
      {
        <section className={styles.registrarSection}>
          <p className={styles["err-msg"]} aria-live="assertive">
            {"errMsg"}
          </p>
          <h1>Summery</h1>
          <form className={styles.registrarForm}>
            {propArray.map((prop) => (
              <p key={prop.name}>
                <strong>{prop.name}: </strong>
                {prop.value}
              </p>
            ))}

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
