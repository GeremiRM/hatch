import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchExchange } from "../hooks/useFetchExchange";
import { Context } from "../state/Context";
import { Display } from "./Display";
import { Form } from "./Form";

import "./styles.scss";

type SubmitEvt = React.FormEvent<HTMLFormElement>;

export const Converter: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [display, setDisplay] = useState(0);

  const { conversionCurr, amount } = useContext(Context);
  const { fetchExchangeRate } = useFetchExchange();

  const onConversion = async (e: SubmitEvt) => {
    e.preventDefault();
    setExchangeRate(
      await fetchExchangeRate(
        conversionCurr.convertFrom,
        conversionCurr.convertTo
      )
    );
    setDisplay(parseFloat(amount) * exchangeRate);
  };

  return (
    <div className="converter">
      <Form onSubmit={onConversion} />
      <Link to="/history" className="converter__link">
        View conversion history
      </Link>
      <Display display={display} />
    </div>
  );
};
