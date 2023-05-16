import React, { useState } from "react";
import "./styles.css"; // Import the CSS file for styling

function ToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
