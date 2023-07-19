import { FC, useState } from "react";

import "./styles.css";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

type SearchBarProps = {
  searchClassName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

interface Tutor {
  id: number;
  name: string;
}

const Search: FC<SearchBarProps> = ({ searchClassName, onClick }) => {
  const [results, setResults] = useState<Tutor[]>([]);

  return (
    <div className={`${searchClassName}`} onClick={onClick}>
      <SearchBar setResults={setResults} />
      <SearchResultList results={results} />
    </div>
  );
};

export default Search;
