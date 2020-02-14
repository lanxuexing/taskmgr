import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { skew } from '../../../share';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [skew]
})
export class ProjectItemComponent implements OnInit {
  @Input() project: any;
  @Output() edit = new EventEmitter<void>();
  @Output() invite = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @HostBinding('@skew') cardState = 'out'; // 宿主元素属性绑定


  constructor() { }

  ngOnInit() { }

  // 监听宿主元素鼠标进入事件
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  // 监听宿主元素鼠标离开事件
  @HostListener('mouseleave')
  onMouseLeaver() {
    this.cardState = 'out';
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
