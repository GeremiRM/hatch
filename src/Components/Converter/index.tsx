import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchExchange } from "../../hooks/useFetchExchange";
import { Display } from "./Display";
import { Form } from "./Form";
import { Currency, ConversionOpts, Currencies } from "../../types/Currencies";

import "./styles.scss";
import { useSaveLocalStorage } from "../../hooks/useSaveLocalStorage";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";

const CURRENCIES: Currencies = ["EUR", "CHF", "USD"];

export const Converter: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [conversionCurr, setConversionCurr] = useState<ConversionOpts>({
    convertFrom: "USD",
    convertTo: "EUR",
  });

  const { fetchExchangeRate } = useFetchExchange();
  const { saveLocalStorage } = useSaveLocalStorage();

  const isFirstRender = useIsFirstRender();

  const onConversion = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      amount: { value: string };
      convertFrom: { value: Currency };
      convertTo: { value: Currency };
    };

    setAmount(Number(target.amount.value));

    setConversionCurr({
      convertFrom: target.convertFrom.value,
      convertTo: target.convertTo.value,
    });
    setExchangeRate(
      await fetchExchangeRate(target.convertFrom.value, target.convertTo.value)
    );
  };

  useEffect(() => {
    if (isFirstRender || !exchangeRate) return;
    saveLocalStorage(
      { amount: amount, currency: conversionCurr.convertFrom },
      {
        amount: Number((amount * exchangeRate!).toFixed(5)),
        currency: conversionCurr.convertTo,
      }
    );
  }, [
    amount,
    conversionCurr.convertFrom,
    conversionCurr.convertTo,
    exchangeRate,
    isFirstRender,
    saveLocalStorage,
  ]);

  return (
    <div className="converter">
      <h1 className="converter__title">Convert currencies in real-time.</h1>
      <Form onSubmit={onConversion} currencies={CURRENCIES} />
      <Link to="/history" className="converter__link">
        View conversion history
      </Link>
      <Display
        amount={amount}
        display={amount * exchangeRate!}
        convertFrom={conversionCurr.convertFrom}
        convertTo={conversionCurr.convertTo}
      />
    </div>
  );
};
