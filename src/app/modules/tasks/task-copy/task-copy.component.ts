import { Task } from './../../../models/task.model';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-task-copy',
  templateUrl: './task-copy.component.html',
  styleUrls: ['./task-copy.component.scss']
})
export class TaskCopyComponent implements OnInit {
  lists: Task[]; // 任务列表

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Task[],
    private dialogRef: MatDialogRef<TaskCopyComponent>
  ) {
    console.log('窗口收到信息: ', data);
    this.lists = this.data;
  }

  ngOnInit() { }

}
