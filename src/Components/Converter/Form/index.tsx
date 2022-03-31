import { ConversionOpt, Currency } from "../../../types/Currencies";
import { CurrencySelect } from "./CurrencySelect";
import "./styles.scss";

interface FormProps {
  onSubmit: any;
  convertTo: Currency;
  convertFrom: Currency;
  onOptionChange: (type: ConversionOpt, newCurr: Currency) => void;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  convertFrom,
  convertTo,
  onOptionChange,
}) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="amount" className="control__label">
          Amount
        </label>
        <input
          defaultValue="1.00"
          type="text"
          name="amount"
          id="amount"
          className="control__field control__input"
        />
      </div>
      <CurrencySelect
        id="convertFrom"
        label="From"
        currencyOpt="convertFrom"
        value={convertFrom}
        onChange={onOptionChange}
      />
      <CurrencySelect
        id="convertTo"
        label="To"
        currencyOpt="convertTo"
        value={convertTo}
        onChange={onOptionChange}
      />
      <button type="submit" className="form__submit">
        Convert
      </button>
    </form>
  );
};
