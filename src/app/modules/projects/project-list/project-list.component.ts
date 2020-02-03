import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
