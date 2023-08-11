import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";

import axios from "../../api/axios";

interface Tutor {
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
}

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<Tutor[]>>;
  setSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setResults,
  setSearchFocused,
}) => {
  const [query, setQuery] = useState("");

  const fetchData = async (value: string) => {
    try {
      const response = await axios.post<Tutor[]>(
        `/api/Tutor/get-teachers`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Filter the search results based on the user's input query
      const re = new RegExp(value.replace(/\s/g, "\\s*"), "gi");

      const filteredResults = response.data.filter((result) => {
        const { firstName, lastName, subject } = result;
        const variants = [
          `${firstName} ${lastName} ${subject}`,
          `${lastName} ${firstName} ${subject}`,
          `${subject} ${firstName} ${lastName}`,
          `${subject} ${lastName} ${firstName}`,
        ];

        const matches = variants.some((variant) =>
          RegExp(re).exec(variant.toLowerCase())
        );

        return matches && value !== "";
      });

      setResults(filteredResults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="input-wrapper">
      <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />
      <Input
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Tutor"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 100)}
      />
    </div>
  );
};

export default SearchBar;
