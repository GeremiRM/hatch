import { Currencies, Currency } from "../types/Currencies";

export const CURRENCIES: Currencies = ["EUR", "CHF", "USD"];

export const DF_CONVERT_FROM: Currency = "USD";
export const DF_CONVERT_TO: Currency = "EUR";

export const API_URL = `http://api.currencylayer.com/live?access_key=${process.env.REACT_APP_API_KEY}&currencies=`;

export const LOCAL_STORAGE_KEY = "Conversions";
