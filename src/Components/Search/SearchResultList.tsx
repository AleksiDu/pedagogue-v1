import { FC } from "react";

interface Tutor {
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
}

interface SearchResultProps {
  results: Tutor[];
}

const SearchResultList: FC<SearchResultProps> = ({ results }) => {
  return (
    <ul className="result-list">
      {results.map(({ email, firstName, lastName, subject }) => {
        return (
          <li key={email}>
            {firstName} {lastName}
            {subject && ` - ${subject}`}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResultList;
