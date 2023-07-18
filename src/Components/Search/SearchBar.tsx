import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";

import axios from "../../api/axios";

interface Tutor {
  id: number;
  name: string;
}

interface SearchBarProps {
  setResult: React.Dispatch<React.SetStateAction<Tutor[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResult }) => {
  const [query, setQuery] = useState("");

  const fetchData = async (value: string) => {
    try {
      // !! FOR TEST
      const response = await axios.get<Tutor[]>(
        `https://jsonplaceholder.typicode.com/users`
      );
      // Filter the search results based on the user's input query
      const filteredResults = response.data.filter((result) => {
        const tutorName = result.name.toLowerCase();

        return tutorName.includes(query.toLowerCase());
      });

      setResult(filteredResults);
      console.log(filteredResults);
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
