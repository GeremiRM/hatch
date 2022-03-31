import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchExchange } from "../../hooks/useFetchExchange";
import { Display } from "./Display";
import { Form } from "./Form";
import {
  Currency,
  ConversionOpts,
  ConversionOpt,
} from "../../types/Currencies";

import "./styles.scss";

export const Converter: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1.0);
  const [conversionCurr, setConversionCurr] = useState<ConversionOpts>({
    convertFrom: "USD",
    convertTo: "EUR",
  });

  const { fetchExchangeRate } = useFetchExchange();

  const onConversion = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      amount: { value: string };
      convertFrom: { value: Currency };
      convertTo: { value: Currency };
    };

    setAmount(Number(target.amount.value));
    setExchangeRate(
      await fetchExchangeRate(target.convertFrom.value, target.convertTo.value)
    );
  };

  const onOptionChange = (type: ConversionOpt, newCurr: Currency) => {
    setConversionCurr({ ...conversionCurr, [type]: newCurr });
  };

  return (
    <div className="converter">
      <Form
        onSubmit={onConversion}
        convertFrom={conversionCurr.convertFrom}
        convertTo={conversionCurr.convertTo}
        onOptionChange={onOptionChange}
      />
      <Link to="/history" className="converter__link">
        View conversion history
      </Link>
      <Display
        amount={amount}
        display={amount * exchangeRate}
        convertFrom={conversionCurr.convertFrom}
        convertTo={conversionCurr.convertTo}
      />
    </div>
  );
};
