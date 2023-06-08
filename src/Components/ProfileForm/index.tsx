import { useEffect, useState } from "react";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import StepConfirm from "./Components/Confirmation";
import StepOne from "./Components/StepOne/index";
import StepTwo from "./Components/StepTwo";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

interface UserProps {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  birthDate?: string;
  genderSelect?:
    | { label?: string; value?: number }
    | { label?: string; value?: number }[];
  citySelect?:
    | { label?: string; value?: number }
    | { label?: string; value?: number }[];
  subject?: string;
  experience?: number;
  images?: { id: string; profilePhoto: boolean; url: string }[];
  age?: number;
  sex?: number;
  city?: number;
  image?: File[] | string;
}

interface ExtendedStepWizardProps extends StepWizardProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

const ProfileForm = () => {
  const [stepWizard, setStepWizard] = useState<ExtendedStepWizardProps | null>(
    null
  );

  const { authUser, isLoggedIn } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState<UserProps>();

  const assignStepWizard = (instance: StepWizardProps) => {
    setStepWizard(instance);
  };

  const assignUser = (val: {}) => {
    console.log("parent receive user callback");
    console.log("val", val);
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    stepWizard?.previousStep?.();
  };

  const handleStepChange = (e: { activeStep: number }) => {
    console.log("step change");

    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    console.log("finish");
    alert("Done");
  };

  const userProfile = async () => {
    try {
      if (authUser !== null) {
        const { accessToken, role } = authUser;
        if (!accessToken) {
          console.log("Access token not found.");
          return;
        }

        let updatedUserRole = "";

        switch (Number(role)) {
          case 1:
            updatedUserRole = "Tutor";
            break;
          case 2:
            updatedUserRole = "Student";
            break;
          case 3:
            updatedUserRole = "Parent";
            break;
          default:
            updatedUserRole = "default";
            break;
        }

        const response = await axios.get<UserProps>(
          `/api/${updatedUserRole}/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // to do add birthDate
        const {
          firstName,
          lastName,
          sex,
          city,
          experience,
          images,
          subject,
          birthday,
        } = response.data;

        const birthDate = birthday ? birthday.split("T")[0] : undefined;

        setUser({
          firstName,
          lastName,
          genderSelect: { value: sex },
          citySelect: { value: city },
          experience,
          image: images ? images[0].url : undefined,
          subject,
          birthDate,
        });

        console.log("profile form response", response.data);
      } else {
        console.log("Auth user not found.");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <section>
      <StepWizard
        instance={assignStepWizard}
        onStepChange={handleStepChange}
        isHashEnabled={true}
      >
        <StepOne
          name="one"
          nextStep={() => stepWizard?.nextStep?.()}
          userCallback={assignUser}
        />
        <StepTwo
          name="two"
          nextStep={() => stepWizard?.nextStep?.()}
          userCallback={assignUser}
          prevStep={handleBack}
        />
        <StepConfirm
          name="confirm"
          firstName={user?.firstName}
          lastName={user?.lastName}
          birthDate={user?.birthDate}
          gender={user?.genderSelect}
          city={user?.citySelect}
          subject={user?.subject}
          experience={user?.experience}
          image={user?.image}
          completeCallback={assignUser}
          prevStep={handleBack}
          lastStep={handleComplete}
          hashKey={"confirm"}
        />
      </StepWizard>
    </section>
  );
};

export default ProfileForm;
