import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexGrow: 1,
    paddingBottom: "1rem",
  }),
  control: (provided) => ({
    ...provided,
    fontSize: "22px",
    borderRadius: "0.5rem",
    borderWidth: "2px",
    borderColor: "-internal-light-dark(rgb(118, 118, 118),rgb(133, 133, 133))",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    color: "#000",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "black",
    marginTop: "-18px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(118, 118, 118, 0.4)"
      : state.isSelected
      ? "rgb(118, 118, 118)"
      : "white",
    ":hover": {
      color: "white",
      backgroundColor: "rgba(118, 118, 118, 0.4)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
  }),
};
