export const validation = (input: string) => {
  const formattedInput = input
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedInput;
};
