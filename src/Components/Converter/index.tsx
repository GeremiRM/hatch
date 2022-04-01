import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { Display } from "./Display";
import { Form } from "./Form";
import { Currency } from "../../types/Currencies";

// Hooks
import { useFetchExchange } from "../../hooks/useFetchExchange";
import { useSaveLocalStorage } from "../../hooks/useSaveLocalStorage";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";

import { DF_CONVERT_FROM, DF_CONVERT_TO } from "../../constants";

import "./styles.scss";

// Default values

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertFrom, setConvertFrom] = useState<Currency>(DF_CONVERT_FROM);
  const [convertTo, setConvertTo] = useState<Currency>(DF_CONVERT_TO);

  const { fetchExchangeRate } = useFetchExchange();
  const { saveLocalStorage } = useSaveLocalStorage();

  const isFirstRender = useIsFirstRender();

  // Converter form submit function
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Get the values from the inputs of the form
    const target = e.target as typeof e.target & {
      amount: { value: number };
      convertFrom: { value: Currency };
      convertTo: { value: Currency };
    };

    setAmount(target.amount.value);

    setConvertFrom(target.convertFrom.value);
    setConvertTo(target.convertTo.value);

    const exchange = await fetchExchangeRate(
      target.convertFrom.value,
      target.convertTo.value
    );

    setExchangeRate(exchange);
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
      {/* Bg */}
      <div className="bg"></div>
      {/* Converter Title */}
      <h1 className="converter__title">Convert currencies in real-time.</h1>
      <div className="top">
        {/* Conversion Form */}
        <Form
          onSubmit={onSubmit}
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
