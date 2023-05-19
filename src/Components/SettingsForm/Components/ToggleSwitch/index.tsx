import "./styles.css";

interface ToggleSwitchProps {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isChecked = false,
  onChange = () => {},
}) => {
  const handleChange = () => {
    onChange(!isChecked);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
