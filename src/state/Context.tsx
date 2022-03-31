import { createContext, useState } from "react";
import {
  Currencies,
  Currency,
  ConversionOpt,
  ConversionOpts,
} from "../types/Currencies";

interface IContext {
  amount: string;
  conversionCurr: ConversionOpts;
  // exchangeRate: number;
  // onChange: () => {};
  currencies: Currencies;
  changeAmount: (newAmount: string) => void;
  onCurrencyChange: (type: ConversionOpt, newCurr: Currency) => void;
}

// Default values
const CURRENCIES: Currencies = ["EUR", "USD", "CHF"];
const DF_AMOUNT = "1.00";
const DF_CONVERT_FROM: Currency = "USD";
const DF_CONVERT_TO: Currency = "EUR";

export const Context = createContext<IContext>({} as IContext);

export const ContextProvider = (props: any) => {
  const [amount, setAmount] = useState(DF_AMOUNT);
  const [conversionCurr, setConversionCurr] = useState<ConversionOpts>({
    convertFrom: DF_CONVERT_FROM,
    convertTo: DF_CONVERT_TO,
  });

  const changeAmount = (newAmount: string) => {
    setAmount(newAmount);
  };

  const onCurrencyChange = (type: ConversionOpt, newCurr: Currency) => {
    setConversionCurr({ ...conversionCurr, [type]: newCurr });
  };

  return (
    <Context.Provider
      value={{
        amount,
        conversionCurr,
        currencies: CURRENCIES,
        changeAmount,
        onCurrencyChange,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
