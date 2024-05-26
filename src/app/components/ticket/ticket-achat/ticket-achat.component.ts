import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CoincappApiService } from "../../../services/coincapp-api.service";
import { TicketConfirmationAchatComponent } from "../ticket-confirmation-achat/ticket-confirmation-achat.component";

export interface Commande {
  name: string;
  nbTicket: number;
  ssTotal: number;
  reduction: number;
  prixTotal: number;
  dogeMode: boolean;
}

@Component({
  selector: "app-ticket-achat",
  templateUrl: "./ticket-achat.component.html",
  styleUrls: ["./ticket-achat.component.scss"],
})
export class TicketAchatComponent implements OnInit {
  ticketForm: FormGroup;
  discountPercentage: number = 5;
  nbTicketsForDiscount: number = 2;
  prixTicketEuro: number = 4;
  dogePrice: number = 0;
  dogePrice$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private coinAppApi: CoincappApiService
  ) {
    this.dogePrice$ = this.coinAppApi
      .getCrypto$("dogecoin")
      .pipe(map((crypto) => 1 / Number(crypto.priceUsd)));

    this.dogePrice$.subscribe((price) => (this.dogePrice = price));
    this.ticketForm = this.fb.group({
      name: ["", Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      dogeMode: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const formValue = this.ticketForm.value;
      const dialogRef = this.dialog.open(TicketConfirmationAchatComponent, {
        data: {
          name: formValue.name,
          nbTicket: formValue.quantite,
          ssTotal: this.calculateSousTotal(),
          reduction: this.calculateDiscount(),
          prixTotal: this.calculateTotalPrice(),
          dogeMode: formValue.dogeMode,
        },
      });
      dialogRef.afterClosed().subscribe(() => this.ticketForm.reset());
    }
  }

  calculateSousTotal(): number {
    const quantite = this.ticketForm.value.quantite;
    const basePrice = quantite * this.prixTicketEuro;
    return this.ticketForm.value.dogeMode
      ? basePrice * this.dogePrice
      : basePrice;
  }

  calculateDiscount(): number {
    if (this.ticketForm.value.quantite < this.nbTicketsForDiscount) {
      return 0;
    }
    const subTotal = this.calculateSousTotal();
    return subTotal * (this.discountPercentage / 100);
  }

  calculateTotalPrice(): number {
    const subTotal = this.calculateSousTotal();
    const discount = this.calculateDiscount();
    return subTotal - discount;
  }

  getCurrency(): string {
    return this.ticketForm.value.dogeMode ? "Doge Coin" : "€";
  }
}
