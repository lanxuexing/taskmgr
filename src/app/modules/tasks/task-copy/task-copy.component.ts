import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from './../../../models/task.model';

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
