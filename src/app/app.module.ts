import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TicketComponent } from "./components/ticket/ticket.component";
import { MeteoCoinComponent } from "./components/meteo-coin/meteo-coin.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { TicketAchatComponent } from "./components/ticket/ticket-achat/ticket-achat.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { TicketConfirmationAchatComponent } from "./components/ticket/ticket-confirmation-achat/ticket-confirmation-achat.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TooltipPosition, MatTooltipModule } from "@angular/material/tooltip";

const appRoutes: Routes = [
  { path: "tickets", component: TicketComponent },
  { path: "meteo-coin", component: MeteoCoinComponent },
  { path: "", redirectTo: "meteo-coin", pathMatch: "full" },
  { path: "**", redirectTo: "meteo-coin" },
];

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    MeteoCoinComponent,
    MenuComponent,
    TicketAchatComponent,
    TicketConfirmationAchatComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
