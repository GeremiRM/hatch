import { useState } from "react";

// Components
import { CurrencySelect } from "./CurrencySelect";

// types
import { Currency } from "../../../types/Currencies";

import "./styles.scss";

interface FormProps {
  onSubmit: (e: React.SyntheticEvent) => Promise<void>;
  dfConvertFrom: Currency;
  dfConvertTo: Currency;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  dfConvertFrom,
  dfConvertTo,
}) => {
  const [convertFrom, setConvertFrom] = useState<Currency>(dfConvertFrom);
  const [convertTo, setConvertTo] = useState<Currency>(dfConvertTo);

  // Switch the conversion values
  const switchValues = () => {
    const oldValues = [convertFrom, convertTo];
    setConvertTo(oldValues[0]);
    setConvertFrom(oldValues[1]);
  };

  return (
    <form className="form" onSubmit={onSubmit} data-testid="form">
      {/* Amount Input */}
      <div className="control">
        <label htmlFor="amount" className="control__label">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          defaultValue="0.00"
          step="any"
          min="0"
          pattern="[0-9]+"
          title="Please only enter numbers"
          className="control__field control__input"
        />
      </div>

      {/* Convert From currency */}
      <CurrencySelect
        id="convertFrom"
        label="From"
        value={convertFrom}
        onChange={setConvertFrom}
      />

      {/* Switcher - Switches conversion values */}
      <div
        className="switcher"
        onClick={() => switchValues()}
        data-testid="switcher"
        role="button"
      >
        <img
          src="./assets/switcher.png"
          alt="switch"
          className="switcher__img"
        />
      </div>

      {/* Convert To currency */}
      <CurrencySelect
        id="convertTo"
        label="To"
        value={convertTo}
        onChange={setConvertTo}
      />

      {/* Submit button */}
      <button type="submit" className="form__submit">
        Convert
      </button>
    </form>
  );
};
