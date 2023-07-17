import { FC } from "react";

import "./styles.css";
import SearchBar from "./SearchBar";

type SearchBarProps = {
  searchClassName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Search: FC<SearchBarProps> = ({ searchClassName, onClick }) => {
  return (
    <div className={`${searchClassName}`} onClick={onClick}>
      <SearchBar />
      <div></div>
    </div>
  );
};

export default Search;
