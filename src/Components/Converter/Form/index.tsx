import { useContext } from "react";
import { Context } from "../../../state/Context";
import { CurrencySelect } from "./CurrencySelect";
import "./styles.scss";

interface FormProps {
  onSubmit: any;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const { amount, changeAmount, conversionCurr } = useContext(Context);

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="amount" className="control__label">
          Amount
        </label>
        <input
          type="text"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => changeAmount(e.target.value)}
          className="control__field control__input"
        />
      </div>
      <CurrencySelect
        id="convertFrom"
        label="From"
        value={conversionCurr.convertFrom}
        currencyOpt="convertFrom"
      />
      <CurrencySelect
        id="convertTo"
        label="To"
        value={conversionCurr.convertTo}
        currencyOpt="convertTo"
      />
      <button type="submit" className="form__submit">
        Convert
      </button>
    </form>
  );
};
