import { Component, Inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class UIService {
  constructor(private dialog: MatDialog) {}

  openDialog(title: string, message: string) {
    this.dialog.open(ErrorMessageDialogComponent, {
      data: { title: title, message: message },
      width: '500px',
    });
  }
}

@Component({
  selector: 'error-message-dialog',
  template: `
    <span mat-dialog-title>{{ data.title }}</span>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Ok</button>
    </div>
  `,
})
export class ErrorMessageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
