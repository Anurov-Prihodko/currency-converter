import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetExchangeCurrencyDataService } from 'src/core/api/get-exchange-currency-data.service';
import { GetConvertCurrency } from '../shared/interfaces/get-convert-currency';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css'],
})
export class CurrencyConversionComponent implements OnInit {
  currencyTypes: string[] = ['UAH', 'USD', 'EUR'];
  form!: FormGroup;
  convertedCurrency: GetConvertCurrency = { date: '', usd: 0 };

  constructor(
    private getExchangeCurrencyDataService: GetExchangeCurrencyDataService
  ) {}

  ngOnInit(): void {
    this.getExchangeCurrencyDataService
      .getConvertCurrency('usd')
      .subscribe((data) => {
        this.convertedCurrency.usd = data.usd;
      });

    console.log(this.convertedCurrency.usd);

    this.form = new FormGroup({
      transactionFrom: new FormControl(1),
      currencyFrom: new FormControl('uah'),
      transactionTo: new FormControl(this.convertedCurrency.usd),
      currencyTo: new FormControl('usd'),
    });
  }

  onChange() {
    console.log(this.convertedCurrency.usd);
  }
}
