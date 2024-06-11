import { Component, OnInit } from "@angular/core";
import {
  CoincappApiService,
  Exchange,
  Crypto,
} from "../../services/coincapp-api.service";
import { Observable, forkJoin } from "rxjs";

@Component({
  selector: "app-meteo-coin",
  templateUrl: "./meteo-coin.component.html",
  styleUrls: ["./meteo-coin.component.scss"],
})
export class MeteoCoinComponent implements OnInit {
  cryptosLabels: string[] = ["dogecoin", "bitcoin", "ethereum"];
  cryptos: Crypto[] = [];
  bestExchange$: Observable<Exchange> = this.coinAppApi.getBestExchange$();

  constructor(private coinAppApi: CoincappApiService) {}

  ngOnInit() {
    this.populateCryptos();
    this.coinAppApi.getPersonnes$();
  }

  populateCryptos() {
    forkJoin(
      this.cryptosLabels.map((label) => this.coinAppApi.getCrypto$(label))
    ).subscribe((cryptos) => (this.cryptos = cryptos));
  }
}
