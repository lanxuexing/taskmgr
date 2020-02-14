import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Task } from '../../../models';
import { leftFloat } from '../../../share';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [leftFloat]
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
