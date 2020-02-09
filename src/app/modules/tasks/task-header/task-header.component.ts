import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
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
