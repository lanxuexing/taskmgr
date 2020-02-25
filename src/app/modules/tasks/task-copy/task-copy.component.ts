import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '@models/index';

@Component({
  selector: 'app-task-copy',
  templateUrl: './task-copy.component.html',
  styleUrls: ['./task-copy.component.scss'],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
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
