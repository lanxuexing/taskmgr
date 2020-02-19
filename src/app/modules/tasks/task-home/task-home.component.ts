import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TaskAddComponent } from '../task-add';
import { TaskCopyComponent } from '../task-copy';
import { TaskDetail, DragData, Task } from '../../../models';
import { ConfirmDialogComponent } from '../../../share/confirm-dialog';
import { TaskEditComponent } from '../task-edit';
import { slide } from '../../../share';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slide],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: '1',
      order: '1',
      name: '待办',
      tasks: [
        {
          id: '1',
          desc: '任务一: 去洛丁城学习魂技去洛丁城学习魂技～',
          completed: false,
          priority: '1',
          owner: {
            id: '1',
            name: '奥斯卡',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: '2',
          desc: '任务二: 去史莱克学校学习',
          completed: true,
          priority: '2',
          owner: {
            id: '2',
            name: '宁荣荣',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: null
        }
      ]
    },
    {
      id: '2',
      order: '2',
      name: '进行中',
      tasks: [
        {
          id: '3',
          desc: '任务三: 去大魂师学院学习',
          completed: true,
          priority: '3',
          owner: {
            id: '3',
            name: '戴沐白',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: null
        },
        {
          id: '4',
          desc: '任务四: 去史莱克学校学习',
          completed: false,
          priority: '2',
          owner: {
            id: '4',
            name: '朱竹清',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    }
  ];
  @HostBinding('@slide') state: any; // 绑定宿主元素路由动画

  constructor(
    private dialog: MatDialog,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  // 快速创建任务
  onQuickAdd(taskName: string) {
    console.log('快速创建任务: ', taskName);
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

  // 编辑
  onEdit() {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      data: {
        title: '修改列表名称',
      }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  // 新建列表
  onAddList() {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      data: {
        title: '新建列表',
      }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  // 处理拖拽事件
  onHandleDragDrop(dragData: DragData, taskList: Task): void {
    switch (dragData.tag) {
      case 'task-item':
        console.log('handle item');
        break;
      case 'task-list':
        console.log('handle list');
        const originList = dragData.data;
        const tempOrder = originList.order;
        originList.order = taskList.order;
        taskList.order = tempOrder;
        break;
      default:
        break;
    }
  }

}
