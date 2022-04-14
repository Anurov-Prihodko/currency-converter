import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetExchangeCurrencyData } from '../../app/shared/interfaces/get-exchange-currency-data';
import { GetConvertCurrency } from 'src/app/shared/interfaces/get-convert-currency';

@Injectable({
  providedIn: 'root',
})
export class GetExchangeCurrencyDataService {
  private NBU_URL: string =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) {}

  getCurrentExchangeCurrencyNBU(): Observable<GetExchangeCurrencyData[]> {
    return this.http.get<GetExchangeCurrencyData[]>(this.NBU_URL);
  }

  getConvertCurrency(
    convertTo: string = 'eur',
    convertFrom: string = 'uah'
  ): Observable<GetConvertCurrency> {
    return this.http.get<GetConvertCurrency>(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${convertFrom}/${convertTo}.json`
    );
  }
}
