import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddComponent implements OnInit {
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {title: string},
    private dialogRef: MatDialogRef<ProjectAddComponent>
  ) {
    this.title = this.data.title;
  }

  ngOnInit() { }

  // 保存
  onSave() {
    this.dialogRef.close(true);
  }

}
