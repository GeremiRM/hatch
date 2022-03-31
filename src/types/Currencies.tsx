export type Currency = "EUR" | "USD" | "CHF";

export type Currencies = Currency[];

export interface ConversionOpts {
  convertFrom: Currency;
  convertTo: Currency;
}

export type ConversionOpt = keyof ConversionOpts;
