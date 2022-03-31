import { Currencies, Currency } from "../../../types/Currencies";
import { CurrencySelect } from "./CurrencySelect";
import "./styles.scss";

interface FormProps {
  onSubmit: (e: React.SyntheticEvent) => Promise<void>;
  currencies: Currencies;
}

const DF_CONVERT_FROM: Currency = "USD";
const DF_CONVERT_TO: Currency = "EUR";

export const Form: React.FC<FormProps> = ({ onSubmit, currencies }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="amount" className="control__label">
          Amount
        </label>
        <input
          defaultValue="0.00"
          type="text"
          name="amount"
          id="amount"
          className="control__field control__input"
        />
      </div>
      <CurrencySelect
        id="convertFrom"
        label="From"
        currencies={currencies}
        defaultValue={DF_CONVERT_FROM}
      />
      <CurrencySelect
        id="convertTo"
        label="To"
        currencies={currencies}
        defaultValue={DF_CONVERT_TO}
      />
      <button type="submit" className="form__submit">
        Convert
      </button>
    </form>
  );
};
