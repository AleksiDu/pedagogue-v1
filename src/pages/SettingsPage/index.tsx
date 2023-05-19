import SettingsForm from "../../Components/SettingsForm";

interface SettingsPageProps {
  userName: string;
  accessToken: string;
  isDarkMode: boolean;
  onToggleMode: (nightMode: boolean) => void;
}
const SettingsPage: React.FC<SettingsPageProps> = ({
  userName,
  accessToken,
  isDarkMode,
  onToggleMode,
}) => {
  return (
    <>
      <SettingsForm
        userName={userName}
        accessToken={accessToken}
        isDarkMode={isDarkMode}
        onToggleMode={onToggleMode}
      />
    </>
  );
};

export default SettingsPage;
