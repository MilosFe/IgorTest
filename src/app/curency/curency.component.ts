import { Component, OnInit } from '@angular/core';
import { Curency } from './curency';
import { CurencyService } from './curency.service';
import { Router } from '@angular/router';



@Component({
  moduleId: module.id,
  selector: 'app-curency',
  templateUrl: './curency.component.html',
})
export class CurencyComponent implements OnInit {
  currency: Curency[];
  error: any;
  adding = false;

  constructor(
    private router: Router,
    private currencyService: CurencyService) { }

    add():void{
      this.adding = true;
    }
  close(saved: Curency): void {
    this.adding = false;
    if (saved) { this.getCurrencies(); }
  }

  getCurrencies(): void {
    this.currencyService
      .getCurrency()
      .then(curency => this.currency = curency)
      .catch(error => this.error = error)

  }

  deleteCurrency(curency: Curency, event: any): void {

    this.currencyService
      .delete(curency)
      .then(res => {
        this.currency = this.currency.filter(h => h !== curency);
          this.getCurrencies();
      })
      .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getCurrencies();
  }
  gotoDetail(currency: Curency): void {
    let link = ['/detail', currency.id];
    this.router.navigate(link);
  }
}
