import "./styles.css";
import notFoundLogo from "../../assets/404.svg";

const FourOhFour = () => {
  return (
    <div className="four-oh-four">
      <img alt={"not-found"} src={notFoundLogo} />
    </div>
  );
};

export default FourOhFour;
