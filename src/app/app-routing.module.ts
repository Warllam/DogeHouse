import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeteoCoinComponent } from './components/meteo-coin/meteo-coin.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [
  { path: '', component: MeteoCoinComponent },
  { path: 'tickets', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
