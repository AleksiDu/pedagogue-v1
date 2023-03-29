import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import "./styles.css";

const searchClient = algoliasearch(
  "L882NFNKX0",
  "673f8744159f97dc36689c0a394bf018"
);

const Search = () => {
  return (
    <InstantSearch indexName={"pedagogue"} searchClient={searchClient}>
      <SearchBox />
    </InstantSearch>
  );
};

export default Search;
