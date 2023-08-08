import { FC } from "react";

interface Tutor {
  id: number;
  firstName: string;
  lastName: string;
  subject: string;
}

interface SearchResultProps {
  results: Tutor[];
}

const SearchResultList: FC<SearchResultProps> = ({ results }) => {
  return (
    <ul className="result-list">
      {results.map(({ firstName, lastName, subject }, id) => {
        return (
          <li key={id}>
            {firstName} {lastName}
            {subject && ` - ${subject}`}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResultList;
