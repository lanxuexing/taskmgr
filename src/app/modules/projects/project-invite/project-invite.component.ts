import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from, Subscription } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';
import { User } from '@models/index';
import { UserService } from '@services/index';

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
export class ProjectInviteComponent implements OnInit, OnDestroy {
  // 第一种写法
  // groupMembers = [
  //   {
  //     id: '1',
  //     name: '哇哈哈'
  //   },
  //   {
  //     id: '2',
  //     name: '可口可乐'
  //   },
  //   {
  //     id: '3',
  //     name: '康师傅'
  //   }
  // ];
  members: User[] = [];
  searchSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string[],
    private dialogRef: MatDialogRef<ProjectInviteComponent>,
    private userService: UserService,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const memberIds = this.data;
    if (memberIds && memberIds.length > 0) {
      this.searchSub = from(memberIds).pipe(
        mergeMap(id => this.userService.getUser(id)),
        reduce((lists: User[], item: User) => [...lists, item], [])
      ).subscribe((members: User[]) => {
          this.members = members;
          this.cdf.markForCheck();
      });
    }
  }

  displayFn(user?: {id: string, name: string}): string | undefined {
    return user ? user.name : undefined;
  }

  // 保存
  onSubmit({value}, event: Event) {
    event.preventDefault();
    this.dialogRef.close(value);
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

}
