import { Component, OnInit } from '@angular/core';

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
          desc: '任务一: 去洛丁城学习魂技',
          owner: {
            id: 1,
            name: '奥斯卡',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务二: 去史莱克学校学习',
          owner: {
            id: 2,
            name: '宁荣荣',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
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
          owner: {
            id: 3,
            name: '戴沐白',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 4,
          desc: '任务四: 去史莱克学校学习',
          owner: {
            id: 4,
            name: '朱竹清',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date()
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onAdd() { }

}
