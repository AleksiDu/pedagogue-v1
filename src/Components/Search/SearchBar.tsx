import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useMemo, useRef, useState } from "react";

import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";

import axios from "../../api/axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  // TODO for results
  // const [items, setItems] = useState([""]);
  // const inputRef = useRef();

  // const filteredItems = useMemo(
  //   () =>
  //     items.filter((item) => {
  //       return item.toLowerCase().includes(query.toLowerCase());
  //     }),
  //   [items, query]
  // );

  const fetchData = async (value: any) => {
    try {
      const payload = {
        subject: value,
      };
      const response = axios.post(`api/Tutor/get-teachers`, payload);
      console.log(response);
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
