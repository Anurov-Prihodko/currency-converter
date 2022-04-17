import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AFTER_COMA } from 'src/app/shared/constants/constants';
import { ConvertCurrency } from 'src/app/shared/interfaces/convert-currency';
import { CurrencyMarkers } from 'src/app/shared/interfaces/currency-markers';
import { ExchangeCurrencyData } from 'src/app/shared/interfaces/exchange-currency-data';
import { GetExchangeCurrencyDataService } from '../api/get-exchange-currency-data.service';

@Injectable({
  providedIn: 'root',
})
export class GetCaclExchangeService {
  constructor(
    private getExchangeCurrencyDataService: GetExchangeCurrencyDataService
  ) {}

  getCalcExchange(
    convertData: ExchangeCurrencyData
  ): Observable<number | null> {
    return this.getExchangeCurrencyDataService
      .getConvertCurrency(
        convertData.currencyFirstField,
        convertData.currencySecondField
      )
      .pipe(
        map((dataFromApi: ConvertCurrency) => {
          const exchangeRate: number = Number(
            dataFromApi[
              convertData.currencySecondField as keyof ConvertCurrency
            ]
          );

          if (convertData.value) {
            return Number(
              (exchangeRate * convertData.value).toFixed(AFTER_COMA)
            );
          } else {
            return null;
          }
        })
      );
  }

  currencyMarketsChange(
    currencyMarkers: CurrencyMarkers[],
    convertData: string
  ) {
    let markerBadge: string = '';
    currencyMarkers.filter((marker): void => {
      if (marker.type.toLowerCase() === convertData.toLowerCase()) {
        markerBadge = marker.badge;
      }
    });
    return markerBadge;
  }
}
