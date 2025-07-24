export interface Currency {
    id: number;
    name: string;
    short_code: string;
    code: string;
    preision: number;
    subunit: number;
    symbol: string;
    symbolFirst: string;
    decimalMark: string;
    thousandsSeparator: string;
}

export interface CurrencyResponse {
    response: Currency[];
}

export interface CurrencyRequest{
    from: string;
    to: string;
    amount: number;
}

export interface CurrencyConversion{
    timestamp: number;
    date: string;
    from: string;
    to: string;
    amount: number;
    value: number;
    meta: any;
}
