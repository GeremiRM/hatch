import axios from "axios";
import { Currencies, Currency } from "../types/Currencies";
import { API_URL } from "../constants";

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
        USD -> CHF / USD -> EUR = EUR -> CHF 
  */
  const fetchExchangeRate = async (
    convertFrom: Currency,
    convertTo: Currency
  ) => {
    switch (convertFrom) {
      case "EUR":
      case "CHF": {
        if (convertTo === "USD") {
          const exchange = await fetchData(convertFrom);
          const exchangeRate = 1 / exchange[convertTo + convertFrom];
          return exchangeRate;
        }
        const exchanges = await fetchData(convertFrom, convertTo);
        const exchangeFrom = exchanges["USD" + convertFrom];
        const exchangeTo = exchanges["USD" + convertTo];

        const exchangeRate = exchangeTo / exchangeFrom;
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
