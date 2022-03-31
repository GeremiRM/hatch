const KEY = "Conversions";

export const useGetLocalStorage = () => {
  const getLocalStorage = () => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : data;
  };

  return { getLocalStorage };
};
