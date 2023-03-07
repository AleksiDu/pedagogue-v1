import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import "./styles.css";

const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");

const Search = () => {
  return (
    <InstantSearch indexName={"instant_search"} searchClient={searchClient}>
      <SearchBox />
    </InstantSearch>
  );
};

export default Search;
