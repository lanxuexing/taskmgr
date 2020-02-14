import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Project } from '../../../models';
import { fadeIn } from '../../../share';
import { ConfirmDialogComponent } from '../../../share/confirm-dialog';
import { ProjectAddComponent } from '../project-add';
import { ProjectInviteComponent } from '../project-invite';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [fadeIn],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      id: 1,
      name: 'muziyu项目',
      desc: '这是一个企业内部的项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
      name: '哇哈哈饮料厂',
      desc: '王力宏全资代言项目',
      coverImg: 'assets/img/covers/2.jpg'
    }
  ];

  constructor(
    private dialog: MatDialog,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  // 添加
  onAdd() {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      data: {
        title: '新建项目'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projects = [
          ...this.projects,
          {
            id: 3,
            name: '可口可乐制造厂',
            desc: '这是一个餐饮业内部的项目',
            coverImg: 'assets/img/covers/3.jpg'
          },
          {
            id: 4,
            name: '雪碧饮料工业区',
            desc: '这是一个餐饮业内部的项目',
            coverImg: 'assets/img/covers/4.jpg'
          }
        ];
        this.cdf.markForCheck();
      }
    });
  }

  // 编辑
  onEdit() {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      data: {
        title: '编辑项目'
      }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  // 邀请
  onInvite() {
    const dialogRef = this.dialog.open(ProjectInviteComponent, {
      autoFocus: false,
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  // 删除
  onDelete(item: Project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '重要提示',
        content: '您确认要删除该项目吗?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('窗口回调数据: ', result);
      if (result) {
        this.projects = this.projects.filter(v => v.id !== item.id);
      }
    });
  }

}
