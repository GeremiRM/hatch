import { useContext } from "react";
import { Context } from "../../../../state/Context";
import { Currency, ConversionOpt } from "../../../../types/Currencies";

interface CurrencyOptProps {
  id: string;
  label: string;
  currencyOpt: ConversionOpt;
  value: Currency;
  onChange: (type: ConversionOpt, newCurr: Currency) => void;
}

export const CurrencySelect: React.FC<CurrencyOptProps> = ({
  id,
  label,
  currencyOpt,
  value,
  onChange,
}) => {
  const { currencies } = useContext(Context);

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
        onChange={(e) => onChange(currencyOpt, e.target.value as Currency)}
        id={id}
        className="control__field control__select"
        value={value}
      >
        {renderOptions()}
      </select>
    </div>
  );
};
