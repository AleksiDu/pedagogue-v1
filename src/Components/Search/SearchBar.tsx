import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <div className="input-wrapper">
      <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />
      <input type="text" placeholder="Search for Tutor" />
    </div>
  );
};

export default SearchBar;
