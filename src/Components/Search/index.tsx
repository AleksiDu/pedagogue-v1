import { FC, useState } from "react";

import "./styles.css";
import SearchBar from "./SearchBar";

type SearchBarProps = {
  searchClassName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

interface Tutor {
  id: number;
  name: string;
}

const Search: FC<SearchBarProps> = ({ searchClassName, onClick }) => {
  const [result, setResult] = useState<Tutor[]>([]);

  return (
    <div className={`${searchClassName}`} onClick={onClick}>
      <SearchBar setResult={setResult} />
      <div></div>
    </div>
  );
};

export default Search;
