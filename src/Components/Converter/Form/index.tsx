import { useState } from "react";
import { Currencies, Currency } from "../../../types/Currencies";
import { CurrencySelect } from "./CurrencySelect";
import "./styles.scss";

interface FormProps {
  onSubmit: (e: React.SyntheticEvent) => Promise<void>;
  currencies: Currencies;
  dfConvertFrom: Currency;
  dfConvertTo: Currency;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  currencies,
  dfConvertFrom,
  dfConvertTo,
}) => {
  const [convertFrom, setConvertFrom] = useState<Currency>(dfConvertFrom);
  const [convertTo, setConvertTo] = useState<Currency>(dfConvertTo);

  const switchValues = () => {
    const oldValues = [convertFrom, convertTo];
    setConvertTo(oldValues[0]);
    setConvertFrom(oldValues[1]);
  };

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
        value={convertFrom}
        onChange={setConvertFrom}
      />
      <div className="switcher" onClick={() => switchValues()}>
        <img
          src="./assets/switcher.png"
          alt="switch"
          className="switcher__img"
        />
      </div>
      <CurrencySelect
        id="convertTo"
        label="To"
        currencies={currencies}
        value={convertTo}
        onChange={setConvertTo}
      />
      <button type="submit" className="form__submit">
        Convert
      </button>
    </form>
  );
};
