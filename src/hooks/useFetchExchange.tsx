import axios from "axios";
import { Currencies, Currency } from "../types/Currencies";

const API_URL = `http://api.currencylayer.com/live?access_key=${process.env.REACT_APP_API_KEY}&currencies=`;

export const useFetchExchange = () => {
  const fetchData = async (...currencies: Currencies) => {
    const { data } = await axios.get(API_URL + currencies.join(","));
    return data.quotes;
  };

  /* 
    The API (because of the type of plan that I have) only returns
    exchange rates based on USD, which means that:
      1) To get the exchange rate of EUR/CHF -> USD, I have to divide the
        exchange of USD -> EUR/CHF, by 1.
        USD -> EUR / 1 = EUR -> USD 
      2) To get the exchange rate between EUR/CHF, I get the USD exchange
        rates of the two and then divide them. 
        USD -> EUR / USD -> CHF = EUR -> CHF 
  */
  const fetchExchangeRate = async (
    convertFrom: Currency,
    convertTo: Currency
  ) => {
    switch (convertFrom) {
      case "EUR":
      case "CHF": {
        if (convertTo === "USD") {
          const data = await fetchData(convertFrom);
          const exchangeRate = 1 / data[convertTo + convertFrom];
          return exchangeRate;
        }
        const exchanges = await fetchData(convertFrom, convertTo);
        const dataFrom = exchanges["USD" + convertFrom];
        const dataTo = exchanges["USD" + convertTo];

        const exchangeRate = dataFrom / dataTo;
        return exchangeRate;
      }
      case "USD": {
        const data = await fetchData(convertTo);
        const exchangeRate = data[convertFrom + convertTo];
        return exchangeRate;
      }
      default:
        break;
    }
  };
  return { fetchExchangeRate };
};
