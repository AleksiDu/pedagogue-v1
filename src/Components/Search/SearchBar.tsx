import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";

import axios from "../../api/axios";

interface Tutor {
  id: number;
  firstName: string;
  lastName: string;
  subject: string;
}

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<Tutor[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
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
      const filteredResults = response.data.filter((result) => {
        const { firstName, lastName, subject } = result;
        const searchResult = {
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          subject: subject.toLowerCase(),
        };

        return (
          (searchResult.firstName.includes(value.toLowerCase()) &&
            value !== "") ||
          (searchResult.lastName.includes(value.toLowerCase()) &&
            value !== "") ||
          (searchResult.subject.includes(value.toLowerCase()) && value !== "")
        );
      });
      console.log(filteredResults);

      setResults(filteredResults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <div className="input-wrapper">
      <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />
      <Input
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Tutor"
      />
    </div>
  );
};

export default SearchBar;
