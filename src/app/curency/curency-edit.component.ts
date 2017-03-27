import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Curency } from './curency';
import { CurencyService } from './curency.service';

@Component({
  moduleId: module.id,
  selector: 'my-curency-edit',
  templateUrl: './curency-edit.html',
  styleUrls: ['./curency-edit.component.css']
})
export class CurrencyEditComponent implements OnInit {
  @Input() curency: Curency;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private curencyService: CurencyService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.curencyService.getCurrencyId(id)
          .then(currency => this.curency = currency);
      } else {
        this.navigated = false;
        this.curency = new Curency();
      }
    });
  }
  save(): void {
    this.curencyService
      .save(this.curency)
      .then(curency => {
        this.curency = curency; // saved hero, w/ id if new
        this.goBack(curency);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(saved: Curency = null): void {
    this.close.emit(saved);
    if (this.navigated) { window.history.back(); }
  }

}
