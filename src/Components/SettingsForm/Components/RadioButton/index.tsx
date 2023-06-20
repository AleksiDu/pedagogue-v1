import React, { useState } from "react";

import "./styles.css"; // Import the CSS module

function RadioButton() {
  const [selectedOption, setSelectedOption] = useState("private");

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="radio-button">
      <label className="privacy-button">
        <input
          type="radio"
          value="private"
          checked={selectedOption === "private"}
          onChange={handleOptionChange}
        />
        Private
      </label>
      <label className="privacy-button">
        <input
          type="radio"
          value="public"
          checked={selectedOption === "public"}
          onChange={handleOptionChange}
        />
        Public
      </label>
    </div>
  );
}

export default RadioButton;
