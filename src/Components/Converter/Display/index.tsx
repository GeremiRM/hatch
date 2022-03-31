import { Currency } from "../../../types/Currencies";
import "./styles.scss";

interface DisplayProps {
  amount: number;
  display: number;
  convertFrom: Currency;
  convertTo: Currency;
}

export const Display: React.FC<DisplayProps> = ({
  display,
  amount,
  convertFrom,
  convertTo,
}) => {
  return (
    <div className="display">
      <h2 className="display__from">{`${Number(amount)} ${convertFrom} =`}</h2>
      <h1 className="display__to">{`${parseFloat(
        Number(display).toFixed(5)
      )} ${convertTo}`}</h1>
    </div>
  );
};
