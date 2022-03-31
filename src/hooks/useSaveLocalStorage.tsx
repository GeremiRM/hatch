import { Currency } from "../types/Currencies";

interface Value {
  amount: number;
  currency: Currency;
}

const KEY = "Conversions";

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

    const oldConversions = localStorage.getItem(KEY);

    if (oldConversions) {
      const conversions = await JSON.parse(oldConversions);
      localStorage.setItem(KEY, JSON.stringify([conversion, ...conversions]));
      return;
    }

    localStorage.setItem(KEY, JSON.stringify([conversion]));
  };

  return { saveLocalStorage };
};
