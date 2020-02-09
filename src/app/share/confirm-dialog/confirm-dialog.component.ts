import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 mat-dialog-title>{{title}}</h3>
    <div mat-dialog-content>{{content}}</div>
    <div mat-dialog-actions [align]="'center'">
        <button mat-raised-button type="button" color="primary" (click)="onClick(true)">确定</button>
        <button mat-button mat-dialog-close type="button" (click)="onClick(false)">取消</button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  content: string;
  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {title: string, content: string},
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  ngOnInit() {
  }

  // 确定
  onClick(result: boolean) {
    this.dialogRef.close(result);
  }

}
