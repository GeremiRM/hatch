import { Currency } from "../../../../types/Currencies";
import { CURRENCIES } from "../../../../constants";

interface CurrencyOptProps {
  id: string;
  label: string;
  value: Currency;
  onChange: React.Dispatch<React.SetStateAction<Currency>>;
}

export const CurrencySelect: React.FC<CurrencyOptProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  // Render the currency options
  const renderOptions = () => {
    return CURRENCIES.map((currency) => (
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
        onChange={(e) => onChange(e.target.value as Currency)}
      >
        {renderOptions()}
      </select>
    </div>
  );
};
