import SettingsForm from "../../Components/SettingsForm";

interface SettingsPageProps {
  userName: string;
  accessToken: string;
}
const SettingsPage: React.FC<SettingsPageProps> = ({
  userName,
  accessToken,
}) => {
  return (
    <>
      <SettingsForm userName={userName} accessToken={accessToken} />
    </>
  );
};

export default SettingsPage;
