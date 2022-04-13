import { Component, OnInit } from '@angular/core';
import { GetExchangeCurrencyDataService } from 'src/core/api/get-exchange-currency-data.service';
import { GetExchangeCurrencyData } from '../shared/interfaces/get-exchange-currency-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  CURRENT_DATE = new Date();
  EUR!: number;
  USD!: number;

  constructor(
    private getExchangeCurrencyDataService: GetExchangeCurrencyDataService
  ) {}

  ngOnInit(): void {
    this.getExchangeCurrencyDataService
      .getExchangeCurrencyData()
      .subscribe((data) => {
        this.EUR = data[32].rate;
        this.USD = data[26].rate;
      });
  }
}
