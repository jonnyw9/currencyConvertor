import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CurrencyConversion, CurrencyRequest, CurrencyResponse } from '../type/currency';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly BASE_URL: string = "https://api.currencybeacon.com/v1/";

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  public getCurrencies(){
    return this.http.get<CurrencyResponse>(this.BASE_URL + 'currencies');
  }

  public convertCurrency(request: CurrencyRequest){
    let params: HttpParams = new HttpParams();
    params = params.set("from", request.from);
    params = params.set("to", request.to);
    params = params.set("amount", request.amount);

    return this.http.get<CurrencyConversion>(this.BASE_URL + 'convert', {params: params});
  }
}
