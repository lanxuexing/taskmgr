import { Task } from './../../../models/task.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {
  title: string;

  prioritys = [
    {
      label: '紧急',
      value: 1
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '普通',
      value: 3
    }
  ]; // 优先级

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {title: string, task?: Task},
    private dialogRef: MatDialogRef<TaskAddComponent>
  ) {
    this.title = this.data.title;
    console.log('窗口收到数据: ', this.data);
  }

  ngOnInit() {
  }

}
