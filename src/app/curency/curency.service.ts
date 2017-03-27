import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Curency } from './curency';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CurencyService {
  private url = 'app/heroes';

  constructor(private http: Http) { }
  getCurrency(): Promise<Array<Curency>> {
    return this.http
      .get(this.url)
      .toPromise()
      .then((response) => {
        return response.json().data as Curency[];
      })
      .catch(this.handleError);
  }
  delete(curency: Curency): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${curency.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  getCurrencyId(id: number): Promise<Curency> {
    return this.getCurrency()
      .then(curency => curency.find(curency => curency.id === id));
  }

  save(curency: Curency): Promise<Curency> {
    if (curency.id) {
      return this.put(curency);
    }
    return this.post(curency);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private post(currency: Curency): Promise<Curency> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.url, JSON.stringify(currency), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(currency: Curency): Promise<Curency> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.url}/${currency.id}`;

    return this.http
      .put(url, JSON.stringify(currency), { headers: headers })
      .toPromise()
      .then(() => currency)
      .catch(this.handleError);
  }
}
