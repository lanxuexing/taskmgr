import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: any;
  @Output() edit = new EventEmitter<void>();
  @Output() invite = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // 编辑
  onEdit() {
    this.edit.emit();
  }

  // 邀请
  onInvite() {
    this.invite.emit();
  }

  // 删除
  onDelete() {
    this.delete.emit();
  }

}
