import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from "../components/mat-confirm-dialog/mat-confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class MatDialogService {

  constructor(private matDialog: MatDialog) { }

  openConfirmDialog(msg){
    return this.matDialog.open(MatConfirmDialogComponent, {
      width: '390px',      
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data: {
        message: msg
      }
    })
  }
}
