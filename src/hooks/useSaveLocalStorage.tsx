import { LOCAL_STORAGE_KEY } from "../constants";
import { Currency } from "../types/Currencies";

interface Value {
  amount: number;
  currency: Currency;
}

export const useSaveLocalStorage = () => {
  const saveLocalStorage = async (from: Value, to: Value) => {
    const conversion = {
      date: new Date().toLocaleString("default", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      from: `${from.amount} ${from.currency}`,
      to: `${to.amount} ${to.currency}`,
    };

    const oldConversions = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (oldConversions) {
      const conversions = await JSON.parse(oldConversions);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([conversion, ...conversions])
      );
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([conversion]));
  };

  return { saveLocalStorage };
};
