import { useGetLocalStorage } from "../../../hooks/useGetLocalStorage";

import "./styles.scss";

interface Conversion {
  date: string;
  from: string;
  to: string;
}

export const Table: React.FC = () => {
  const { getLocalStorage } = useGetLocalStorage();

  const renderConversions = () => {
    const conversions: Conversion[] = getLocalStorage();

    if (!conversions) return;

    return conversions.map(({ date, from, to }: Conversion, idx) => (
      <tr key={date + from + to + idx} className="row">
        <td className="data">{date}</td>
        <td className="data">{from}</td>
        <td className="data">{to}</td>
      </tr>
    ));
  };

  return (
    <table className="table">
      <thead className="head">
        <tr className="row">
          <th className="headers">Date</th>
          <th className="headers">From</th>
          <th className="headers">To</th>
        </tr>
      </thead>
      <tbody className="body">{renderConversions()}</tbody>
    </table>
  );
};
