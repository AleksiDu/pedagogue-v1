import { FC } from "react";

interface SearchResultProps {
  results: any;
}

const SearchResultList: FC<SearchResultProps> = ({ results }) => {
  return (
    <ul className="result-list">
      {results.map((result: { name: any }, id: any) => {
        return <li key={id}>{result.name}</li>;
      })}
    </ul>
  );
};

export default SearchResultList;
