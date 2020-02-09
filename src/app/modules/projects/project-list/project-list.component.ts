import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectInviteComponent } from '../project-invite';
import { ProjectAddComponent } from '../project-add';

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
      data: {}
    });
    dialogRef.afterClosed().subscribe(callback => { });
  }

  // 编辑
  onEdit() { }

  // 邀请
  onInvite() {
    const dialogRef = this.dialog.open(ProjectInviteComponent, {
      autoFocus: false,
      data: {}
    });
    dialogRef.afterClosed().subscribe(callback => { });
  }

  // 删除
  onDelete() { }

}
