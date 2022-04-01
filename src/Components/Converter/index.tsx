import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { Display } from "./Display";
import { Form } from "./Form";
import { Currency, Currencies } from "../../types/Currencies";

// Hooks
import { useFetchExchange } from "../../hooks/useFetchExchange";
import { useSaveLocalStorage } from "../../hooks/useSaveLocalStorage";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";

import "./styles.scss";

// Default values
const CURRENCIES: Currencies = ["EUR", "CHF", "USD"];

const DF_CONVERT_FROM: Currency = "USD";
const DF_CONVERT_TO: Currency = "EUR";

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertFrom, setConvertFrom] = useState<Currency>(DF_CONVERT_FROM);
  const [convertTo, setConvertTo] = useState<Currency>(DF_CONVERT_TO);

  const { fetchExchangeRate } = useFetchExchange();
  const { saveLocalStorage } = useSaveLocalStorage();

  const isFirstRender = useIsFirstRender();

  // Converter form submit function
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setExchangeRate(null);

    // Get the values from the inputs of the form
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
      {/* Converter Title */}
      <h1 className="converter__title">Convert currencies in real-time.</h1>
      <div className="top">
        {/* Conversion Form */}
        <Form
          onSubmit={onSubmit}
          currencies={CURRENCIES}
          dfConvertFrom={DF_CONVERT_FROM}
          dfConvertTo={DF_CONVERT_TO}
        />

        {/* Link */}
        <Link to="/history" className="converter__link">
          View conversion history &gt;
        </Link>
      </div>

      {/* Conversion Display */}
      <div className="bottom">
        <Display
          amount={amount}
          display={amount * exchangeRate!}
          convertFrom={convertFrom}
          convertTo={convertTo}
        />
      </div>
    </div>
  );
};
