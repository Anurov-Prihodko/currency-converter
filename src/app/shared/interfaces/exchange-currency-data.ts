import { Currency } from '../enums/currency';

interface ExchangeCurrencyDataForApi {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

interface ExchangeCurrencyDataFromForm {
  transactionFrom: number;
  currencyFrom: string;
  transactionTo: number;
  currencyTo: string;
}

interface ExchangeCurrencyData {
  currencyFirstField: Currency;
  currencySecondField: Currency;
  value: number | null;
  whatField?: string;
}

export {
  ExchangeCurrencyDataForApi,
  ExchangeCurrencyDataFromForm,
  ExchangeCurrencyData,
};
