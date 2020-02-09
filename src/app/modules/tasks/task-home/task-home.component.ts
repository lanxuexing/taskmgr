import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TaskAddComponent } from '../task-add';
import { TaskCopyComponent } from '../task-copy';
import { TaskDetail } from '../../../models';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一: 去洛丁城学习魂技去洛丁城学习魂技～',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '奥斯卡',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: '任务二: 去史莱克学校学习',
          completed: true,
          priority: 2,
          owner: {
            id: 2,
            name: '宁荣荣',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: null
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 3,
          desc: '任务三: 去大魂师学院学习',
          completed: true,
          priority: 3,
          owner: {
            id: 3,
            name: '戴沐白',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: null
        },
        {
          id: 4,
          desc: '任务四: 去史莱克学校学习',
          completed: false,
          priority: 2,
          owner: {
            id: 4,
            name: '朱竹清',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    }
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // 新建任务
  onAdd() {
    const dialogRef = this.dialog.open(TaskAddComponent, {
      data: {
        title: '新建任务'
      }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  // 移动
  onMove() {
    const dialogRef = this.dialog.open(TaskCopyComponent, {
      data: this.lists
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  // task条目点击事件
  onTaskClick(item: TaskDetail) {
    const dialogRef = this.dialog.open(TaskAddComponent, {
      data: {
        title: '修改任务',
        task: item
      }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
