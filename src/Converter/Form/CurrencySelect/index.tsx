import { useContext } from "react";
import { Context } from "../../../state/Context";
import { Currency, ConversionOpt } from "../../../types/Currencies";

interface CurrencyOptProps {
  id: string;
  label: string;
  value: Currency;
  currencyOpt: ConversionOpt;
}

export const CurrencySelect: React.FC<CurrencyOptProps> = ({
  id,
  label,
  value,
  currencyOpt,
}) => {
  const { onCurrencyChange, currencies } = useContext(Context);

  const renderOptions = () => {
    return currencies.map((currency) => (
      <option key={currency}>{currency}</option>
    ));
  };

  return (
    <div className="control">
      <label className="control__label">{label}</label>
      <select
        name={id}
        id={id}
        className="control__field control__select"
        value={value}
        onChange={(e) =>
          onCurrencyChange(currencyOpt, e.target.value as Currency)
        }
      >
        {renderOptions()}
      </select>
    </div>
  );
};
