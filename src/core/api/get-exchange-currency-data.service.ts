import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { GetExchangeCurrencyData } from '../../app/shared/interfaces/get-exchange-currency-data';

@Injectable({
  providedIn: 'root',
})
export class GetExchangeCurrencyDataService {
  private BASE_URL =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) {}

  getExchangeCurrencyData(): Observable<GetExchangeCurrencyData[]> {
    return this.http.get<GetExchangeCurrencyData[]>(this.BASE_URL);
  }
}
