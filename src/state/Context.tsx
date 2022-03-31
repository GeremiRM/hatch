import React, { createContext, useState } from "react";
import { useFetchExchange } from "../hooks/useFetchExchange";
import {
  Currencies,
  Currency,
  ConversionOpt,
  ConversionOpts,
} from "../types/Currencies";

interface IContext {
  amount: string;
  conversionCurr: ConversionOpts;
  currencies: Currencies;
  // onConversion: (e: SubmitEvt) => void;
  exchangeRate: number;
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
  const [exchangeRate, setExchangeRate] = useState(0);

  const { fetchExchangeRate } = useFetchExchange();

  const changeAmount = (newAmount: string) => {
    setAmount(newAmount);
  };

  const onCurrencyChange = (type: ConversionOpt, newCurr: Currency) => {
    setConversionCurr({ ...conversionCurr, [type]: newCurr });
  };

  // const onConversion = async (e: SubmitEvt) => {
  //   e.preventDefault();
  //   setExchangeRate(
  //     await fetchExchangeRate(
  //       conversionCurr.convertFrom,
  //       conversionCurr.convertTo
  //     )
  //   );
  // };

  return (
    <Context.Provider
      value={{
        amount,
        conversionCurr,
        currencies: CURRENCIES,
        changeAmount,
        onCurrencyChange,
        exchangeRate,
        // onConversion,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
