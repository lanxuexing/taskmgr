import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
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

}
