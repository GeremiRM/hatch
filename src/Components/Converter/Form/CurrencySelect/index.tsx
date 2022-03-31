import { Currencies, Currency } from "../../../../types/Currencies";

interface CurrencyOptProps {
  id: string;
  label: string;
  currencies: Currencies;
  value: Currency;
  onChange: React.Dispatch<React.SetStateAction<Currency>>;
}

export const CurrencySelect: React.FC<CurrencyOptProps> = ({
  id,
  label,
  currencies,
  value,
  onChange,
}) => {
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
        onChange={(e) => onChange(e.target.value as Currency)}
      >
        {renderOptions()}
      </select>
    </div>
  );
};
