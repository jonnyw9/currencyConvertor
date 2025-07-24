import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './service/http.service';
import { CurrencyConversion, CurrencyRequest, CurrencyResponse } from './type/currency';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'currencyConverter';

  private httpService: HttpService = inject(HttpService);

  public currencies$!: Observable<CurrencyResponse>;
  public currencyConversion$?: Observable<CurrencyConversion>;

  currencyConversionForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required, amountValidator()])
  });

  ngOnInit(){
    this.currencies$ = this.httpService.getCurrencies();
  }

  submit(){
    if(this.currencyConversionForm.valid){
      const currencyConversionRequest: CurrencyRequest = {
        from: this.currencyConversionForm.get('from')?.value!,
        to: this.currencyConversionForm.get('to')?.value!,
        amount: this.currencyConversionForm.get('amount')?.value!,
      }
      this.currencyConversion$ = this.httpService.convertCurrency(currencyConversionRequest);
    }
  }
}

export function amountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if(value !== null && (isNaN(value) || value <= 0)){
      return {invalidValue: true};
    }

    return null;
  }
}
