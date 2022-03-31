import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchExchange } from "../../hooks/useFetchExchange";
import { Display } from "./Display";
import { Form } from "./Form";
import { Currency, Currencies } from "../../types/Currencies";

import "./styles.scss";
import { useSaveLocalStorage } from "../../hooks/useSaveLocalStorage";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";

const CURRENCIES: Currencies = ["EUR", "CHF", "USD"];

const DF_CONVERT_FROM: Currency = "USD";
const DF_CONVERT_TO: Currency = "EUR";

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertTo, setConvertTo] = useState<Currency>(DF_CONVERT_FROM);
  const [convertFrom, setConvertFrom] = useState<Currency>(DF_CONVERT_TO);

  const { fetchExchangeRate } = useFetchExchange();
  const { saveLocalStorage } = useSaveLocalStorage();

  const isFirstRender = useIsFirstRender();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExchangeRate(null);
    const target = e.target as typeof e.target & {
      amount: { value: string };
      convertFrom: { value: Currency };
      convertTo: { value: Currency };
    };

    setAmount(Number(target.amount.value));

    setConvertFrom(target.convertFrom.value);
    setConvertTo(target.convertTo.value);

    setExchangeRate(
      await fetchExchangeRate(target.convertFrom.value, target.convertTo.value)
    );
  };

  useEffect(() => {
    if (isFirstRender || !exchangeRate) return;
    saveLocalStorage(
      { amount: amount, currency: convertFrom },
      {
        amount: Number((amount * exchangeRate!).toFixed(5)),
        currency: convertTo,
      }
    );
  }, [
    amount,
    convertFrom,
    convertTo,
    exchangeRate,
    isFirstRender,
    saveLocalStorage,
  ]);

  return (
    <div className="converter">
      <h1 className="converter__title">Convert currencies in real-time.</h1>
      <Form
        onSubmit={onSubmit}
        currencies={CURRENCIES}
        dfConvertFrom={DF_CONVERT_FROM}
        dfConvertTo={DF_CONVERT_TO}
      />
      <Link to="/history" className="converter__link">
        View conversion history &gt;
      </Link>
      <Display
        amount={amount}
        display={amount * exchangeRate!}
        convertFrom={convertFrom}
        convertTo={convertTo}
      />
    </div>
  );
};
