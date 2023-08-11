import { FC, useState } from "react";

import "./styles.css";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

type SearchBarProps = {
  searchClassName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

interface Tutor {
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
}

const Search: FC<SearchBarProps> = ({ searchClassName, onClick }) => {
  const [results, setResults] = useState<Tutor[]>([]);
  const [isSearchFocused, setSearchFocused] = useState(false);

  return (
    <div className={`${searchClassName}`} onClick={onClick}>
      <SearchBar setResults={setResults} setSearchFocused={setSearchFocused} />
      {isSearchFocused && <SearchResultList results={results} />}
    </div>
  );
};

export default Search;
