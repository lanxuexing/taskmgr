import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { skew } from '../../../share';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [skew],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
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
