import { FC } from "react";
import Search from "../Search";

type SearchBarProps = {
  searchClass: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const SearchBar: FC<SearchBarProps> = ({ searchClass, onClick }) => {
  return (
    <div className={searchClass} onClick={onClick}>
      <Search />
    </div>
  );
};

export default SearchBar;
