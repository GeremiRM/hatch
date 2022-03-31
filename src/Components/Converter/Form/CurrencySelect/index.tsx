import { Currencies, Currency } from "../../../../types/Currencies";

interface CurrencyOptProps {
  id: string;
  label: string;
  currencies: Currencies;
  defaultValue?: Currency;
}

export const CurrencySelect: React.FC<CurrencyOptProps> = ({
  id,
  label,
  currencies,
  defaultValue = "USD",
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
        defaultValue={defaultValue}
      >
        {renderOptions()}
      </select>
    </div>
  );
};
