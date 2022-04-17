import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExchangeCurrencyDataForApi } from '../../app/shared/interfaces/exchange-currency-data';
import { ConvertCurrency } from '../../app/shared/interfaces/convert-currency';

@Injectable({
  providedIn: 'root',
})
export class GetExchangeCurrencyDataService {
  private NBU_URL: string =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  private JSDELIVR_URL = 'https://cdn.jsdelivr.net';

  constructor(private http: HttpClient) {}

  getCurrentExchangeCurrencyNBU(): Observable<ExchangeCurrencyDataForApi[]> {
    return this.http.get<ExchangeCurrencyDataForApi[]>(this.NBU_URL);
  }

  getConvertCurrency(
    convertFrom: string = 'uah',
    convertTo: string = 'usd'
  ): Observable<ConvertCurrency> {
    return this.http.get<ConvertCurrency>(
      `${this.JSDELIVR_URL}/gh/fawazahmed0/currency-api@1/latest/currencies/${convertFrom}/${convertTo}.json`
    );
  }
}
