import { ChangeEventHandler, LegacyRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

const Input = (props: {
  name: string;
  id?: string;
  type: string | undefined;
  PropRef?: LegacyRef<HTMLInputElement>;
  autoComplete?: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number;
  required?: boolean;
  ariaInvalid?: string;
  ariaDescribedby?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  note?: string;
  note2?: string;
  note3?: string;
  inputType?: string;
  isValidInputType?: boolean;
  isInputTypeFocus?: boolean;
  checked?: boolean;
  accept?: string;
}) => {
  return (
    <div className={styles.registrarForm}>
      <label htmlFor={props.id}>
        {props.name}
        <FontAwesomeIcon
          icon={faCheck}
          className={
            styles[props.isValidInputType && props.inputType ? "valid" : "hide"]
          }
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            styles[
              props.isValidInputType || !props.inputType ? "hide" : "invalid"
            ]
          }
        />
      </label>
      <input
        id={props.id}
        type={props.type}
        ref={props.PropRef}
        autoComplete={props.autoComplete}
        onChange={props.onChange}
        value={props.value}
        required
        aria-invalid={props.isValidInputType ? "false" : "true"}
        aria-describedby={props.ariaDescribedby}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        checked={props.checked}
      />
      <p
        id={props.ariaDescribedby}
        className={
          styles[
            props.isInputTypeFocus && props.inputType && !props.isValidInputType
              ? "instructions"
              : "offscreen"
          ]
        }
      >
        {" "}
        <label className={styles[props.note ? "instruction" : "offscreen"]}>
          <FontAwesomeIcon icon={faInfoCircle} />
          {props.note}
        </label>
        <label className={styles[props.note2 ? "instruction" : "offscreen"]}>
          <br />
          <FontAwesomeIcon icon={faInfoCircle} />
          {props.note2}
        </label>
        <label className={styles[props.note3 ? "instruction" : "offscreen"]}>
          <br />
          <FontAwesomeIcon icon={faInfoCircle} />
          {props.note3}
        </label>
      </p>
    </div>
  );
};

export default Input;
