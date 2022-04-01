import { LOCAL_STORAGE_KEY } from "../constants";

export const useGetLocalStorage = () => {
  const getLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : data;
  };

  return { getLocalStorage };
};
