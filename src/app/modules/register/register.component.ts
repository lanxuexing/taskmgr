import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  avatars: string[];

  constructor() { }

  ngOnInit() {
    const numbers = Array.from({length: 12}, (_, i) => i + 1);
    this.avatars = numbers.map(v => `avatars:svg-${v}`);
  }

}
