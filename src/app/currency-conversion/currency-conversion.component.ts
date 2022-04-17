import { Component, OnInit } from '@angular/core';
import { GetExchangeCurrencyDataService } from 'src/core/api/get-exchange-currency-data.service';
import {
  AFTER_COMA,
  INITIAL_VALUE_FIRST_FIELD,
} from '../shared/constants/constants';
import { Currency } from '../shared/enums/currency';
import { FIELDS_NAME } from '../shared/enums/fields';
import { CurrencyMarkers } from '../shared/interfaces/currency-markers';
import { ExchangeCurrencyData } from '../shared/interfaces/exchange-currency-data';
import { GetCaclExchangeService } from 'src/core/currency-conversion/get-cacl-exchange.service';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css'],
})
export class CurrencyConversionComponent implements OnInit {
  currencyMarkers: CurrencyMarkers[] = [
    { type: 'UAH', badge: '₴' },
    { type: 'USD', badge: '$' },
    { type: 'EUR', badge: '€' },
  ];

  // for using enum in template
  public fieldsName: typeof FIELDS_NAME = FIELDS_NAME;

  // form state
  public transactionFirstField: number | null = INITIAL_VALUE_FIRST_FIELD;
  public currencyFirstField: Currency = Currency.UAH;
  public transactionSecondField: number | null = null;
  public currencySecondField: Currency = Currency.USD;

  currencyBadgeTop: string = this.currencyMarkers[0].badge;
  currencyBadgeButtom: string = this.currencyMarkers[1].badge;

  constructor(
    private getExchangeCurrencyDataService: GetExchangeCurrencyDataService,
    private getCaclExchangeService: GetCaclExchangeService
  ) {}

  ngOnInit(): void {
    this.getExchangeCurrencyDataService
      .getConvertCurrency()
      .subscribe((exchangeData) => {
        this.transactionSecondField = Number(
          exchangeData.usd?.toFixed(AFTER_COMA)
        );
      });
  }

  public formModelChanged(field: FIELDS_NAME): void {
    let convertData: ExchangeCurrencyData;
    switch (field) {
      case FIELDS_NAME.TRANSACTION_FIRST_VALUE:
      case FIELDS_NAME.CURRENCY_FIRST_VALUE:
        convertData = {
          currencyFirstField: this.currencyFirstField,
          currencySecondField: this.currencySecondField,
          value: this.transactionFirstField,
        };

        this.currencyBadgeTop =
          this.getCaclExchangeService.currencyMarketsChange(
            this.currencyMarkers,
            this.currencyFirstField
          );
        break;

      case FIELDS_NAME.TRANSACTION_SECOND_VALUE:
      case FIELDS_NAME.CURRENCY_SECOND_VALUE:
        convertData = {
          currencyFirstField: this.currencySecondField,
          currencySecondField: this.currencyFirstField,
          value: this.transactionSecondField,
        };

        this.currencyBadgeButtom =
          this.getCaclExchangeService.currencyMarketsChange(
            this.currencyMarkers,
            this.currencySecondField
          );
        break;

      default:
        return console.log('Ops, someting went wrong!');
    }

    this.getCaclExchangeService
      .getCalcExchange(convertData)
      .subscribe((res) => {
        switch (field) {
          case FIELDS_NAME.TRANSACTION_FIRST_VALUE:
          case FIELDS_NAME.CURRENCY_FIRST_VALUE:
            this.transactionSecondField = res;
            break;

          case FIELDS_NAME.TRANSACTION_SECOND_VALUE:
          case FIELDS_NAME.CURRENCY_SECOND_VALUE:
            this.transactionFirstField = res;
            break;
        }
      });
  }
}
