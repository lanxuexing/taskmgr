import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-invite',
  templateUrl: './project-invite.component.html',
  styleUrls: ['./project-invite.component.scss']
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
