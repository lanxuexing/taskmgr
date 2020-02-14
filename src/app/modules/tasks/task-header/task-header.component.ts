import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {
  @Input() header: string;
  @Output() add = new EventEmitter<void>();
  @Output() move = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // 添加
  onAdd() {
    this.add.emit();
  }

  // 移动
  onCopy() {
    this.move.emit();
  }

  // 删除
  onDelete() {
    this.delete.emit();
  }

  // 编辑
  onEdit() {
    this.edit.emit();
  }

}
