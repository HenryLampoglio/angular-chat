import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-response-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './response-dialog.html',
  styleUrl: './response-dialog.css',
})
export class ResponseDialog {
  constructor(
    public dialogRef: MatDialogRef<ResponseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { response: string; success?: boolean }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
