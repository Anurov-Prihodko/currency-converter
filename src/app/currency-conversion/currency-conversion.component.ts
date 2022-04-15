import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetExchangeCurrencyDataService } from 'src/core/api/get-exchange-currency-data.service';
import { AFTER_COMA, INITIAL_VALUE } from '../shared/constants/constants';
import { Currency } from '../shared/enums/currency';
import { CurrencyMarkers } from '../shared/interfaces/currency-markers';

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

  public form: FormGroup = this.formBuilder.group({
    transactionFrom: [INITIAL_VALUE],
    currencyFrom: [Currency.UAH],
    transactionTo: [],
    currencyTo: [Currency.USD],
  });

  currencyBadgeTop: string = this.currencyMarkers[0].badge;
  currencyBadgeButtom: string = this.currencyMarkers[1].badge;

  constructor(
    private getExchangeCurrencyDataService: GetExchangeCurrencyDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getExchangeCurrencyDataService
      .getConvertCurrency(Currency.UAH, Currency.USD)
      .subscribe((data) => {
        this.form
          .get('transactionTo')
          ?.setValue(data.usd?.toFixed(AFTER_COMA), { emitEvent: false });
      });

    let { transactionFrom, currencyFrom, transactionTo, currencyTo } =
      this.form.value;

    this.form
      .get('transactionFrom')
      ?.valueChanges.subscribe((currencyNum: number) => {
        this.getExchangeCurrencyDataService
          .getConvertCurrency(currencyFrom, currencyTo)
          .subscribe((dataFromApi) => {
            this.form
              .get('transactionTo')
              ?.setValue(
                (dataFromApi[currencyTo] * currencyNum).toFixed(AFTER_COMA),
                {
                  emitEvent: false,
                }
              );
          });
      });
  }
}
