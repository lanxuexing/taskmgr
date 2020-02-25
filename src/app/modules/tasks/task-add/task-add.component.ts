import { Task } from '@models/index';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
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

  ngOnInit() { }

  // 保存
  onSave() {
    this.dialogRef.close(true);
  }

}
