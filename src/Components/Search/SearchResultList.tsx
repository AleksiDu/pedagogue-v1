import { FC } from "react";
import { Link } from "react-router-dom";

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
          <Link key={email} to={`tutor/${email}`}>
            {firstName} {lastName}
            {subject && ` - ${subject}`}
          </Link>
        );
      })}
    </ul>
  );
};

export default SearchResultList;
