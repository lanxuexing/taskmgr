import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../models';
import { leftFloat } from '../../../share';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [leftFloat],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  widerPriority = 'out'; // 动画优先级
  @Input() task: Task;
  @Output() taskClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // 复选框点击事件
  onCheckBoxClick(mEvent: Event) {
    mEvent.stopPropagation();
  }

  // 任务列表条目点击事件
  onClickItem() {
    this.taskClick.emit();
  }

  // 监听鼠标进入事件
  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'in';
  }

  // 监听鼠标离开事件
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'out';
  }

}
