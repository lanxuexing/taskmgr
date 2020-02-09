import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectInviteComponent } from '../project-invite';
import { ProjectAddComponent } from '../project-add';
import { ConfirmDialogComponent } from '../../../share/confirm-dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      name: 'muziyu项目',
      desc: '这是一个企业内部的项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: '哇哈哈饮料厂',
      desc: '王力宏全资代言项目',
      coverImg: 'assets/img/covers/0.jpg'
    }
  ];

  constructor(
    private dialog: MatDialog
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
    dialogRef.afterClosed().subscribe(result => { });
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
  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '重要提示',
        content: '您确认要删除该项目吗?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('窗口回调数据: ', result);
    });
  }

}
