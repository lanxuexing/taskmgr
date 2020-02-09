import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header: string;
  @Output() move = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // 移动
  onCopy() {
    this.move.emit();
  }

}
