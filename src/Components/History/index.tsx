import { Link } from "react-router-dom";
import { Table } from "./Table";

import "./styles.scss";

export const History: React.FC = () => {
  return (
    <div className="history">
      <Link to="/" className="history__link">
        &#60; Go back
      </Link>
      <Table />
    </div>
  );
};
