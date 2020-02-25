import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { toastOptions } from '@configs/index';
import { ToastComponent } from '@share/toast';

@Injectable()
export class ToastService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  toast(data: any, ) {
    this.snackBar.openFromComponent(ToastComponent, Object.assign({}, toastOptions, {data}));
  }

}
