import { FC } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

import "./styles.css";

const searchClient = algoliasearch(
  "L882NFNKX0",
  "673f8744159f97dc36689c0a394bf018"
);

type SearchBarProps = {
  searchClassName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Search: FC<SearchBarProps> = ({ searchClassName, onClick }) => {
  return (
    <div className={searchClassName} onClick={onClick}>
      <InstantSearch indexName={"pedagogue"} searchClient={searchClient}>
        <SearchBox />
      </InstantSearch>
    </div>
  );
};

export default Search;
