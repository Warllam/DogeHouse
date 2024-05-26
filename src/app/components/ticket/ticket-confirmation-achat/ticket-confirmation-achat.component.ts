import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-ticket-confirmation-achat",
  templateUrl: "./ticket-confirmation-achat.component.html",
  styleUrl: "./ticket-confirmation-achat.component.scss",
})
export class TicketConfirmationAchatComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketConfirmationAchatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
