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
      <h2 className="display__from" data-testid="displayFrom">{`${Number(
        amount
      )} ${convertFrom} =`}</h2>
      <h1 className="display__to" data-testid="displayTo">{`${parseFloat(
        Number(display).toFixed(5)
      )} ${convertTo}`}</h1>
    </div>
  );
};
