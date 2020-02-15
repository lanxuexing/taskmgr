import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-quick',
  templateUrl: './task-quick.component.html',
  styleUrls: ['./task-quick.component.scss']
})
export class TaskQuickComponent implements OnInit {
  quickName: string; // 任务名称
  @Output() send = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  // 提交, 且绑定回车键事件
  @HostListener('keyup.enter')
  onSend() {
    if (!this.quickName || this.quickName.length === 0 || !this.quickName.trim()) {
      return;
    }
    this.send.emit(this.quickName);
    this.quickName = '';
  }

}
