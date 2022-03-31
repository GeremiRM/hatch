import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../state/Context";

const API_URL = `http://api.currencylayer.com/live?access_key=${process.env.API_KEY}&currencies=`;

export const useFetchExchange = () => {
  const { conversionCurr } = useContext(Context);

  useEffect(() => {
    const fetchExchange = async () => {
      // const {data}
    };
  }, [conversionCurr]);
};
