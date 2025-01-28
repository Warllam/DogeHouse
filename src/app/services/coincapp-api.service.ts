import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface Crypto {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
  logoUrl: string;
}

export interface Exchange {
  exchangeId: string;
  name: string;
  rank: number;
  percentTotalVolume: string;
  volumeUsd: string;
  tradingPairs: number;
  socket: boolean;
  exchangeUrl: string;
  updated: number;
}

@Injectable({
  providedIn: "root",
})
export class CoincappApiService {
  private API_URL_COIN = "https://api.coincap.io/v2/assets";
  private API_URL_EXCHANGE = "https://api.coincap.io/v2/exchanges";
  private API_URL_BACK = "https://localhost/api";

  constructor(private http: HttpClient) {}

  getCrypto$(name: any): Observable<Crypto> {
    const url = `${this.API_URL_COIN}/${name}`;
    return this.get$(url).pipe(
      map((response) => ({
        ...response.data,
        logoUrl: `https://cryptologos.cc/logos/${response.data.name.toLowerCase()}-${response.data.symbol.toLowerCase()}-logo.svg?v=032`,
      })),
      catchError((error) => throwError(() => new Error("Une erreur s'est produite")))
    );
  }

  getBestExchange$(): Observable<Exchange> {
    const url = `${this.API_URL_EXCHANGE}`;
    return this.http.get(url).pipe(
      map((response: any) => response.data.find((exchange: any) => exchange.rank == "1")),
      catchError(this.handleError)
    );
  }

  getPersonnes$(): Observable<any> {
    const url = `${this.API_URL_BACK}`;
    return this.http.get(url).pipe(
      map((response: any) => response),
      catchError((error) => throwError(() => error))
    );
  }

  get$(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError((error) => throwError(() => new Error("Erreur HTTP GET")))
    );
  }

  post$(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error("erreur : " + error.message));
  }
}
