import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-invite',
  templateUrl: './project-invite.component.html',
  styleUrls: ['./project-invite.component.scss'],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInviteComponent implements OnInit {
  groupMembers = [
    {
      id: '1',
      name: '哇哈哈'
    },
    {
      id: '2',
      name: '可口可乐'
    },
    {
      id: '3',
      name: '康师傅'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  displayFn(user?: {id: string, name: string}): string | undefined {
    return user ? user.name : undefined;
  }

}
