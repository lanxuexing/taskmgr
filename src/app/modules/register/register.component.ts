import { Component, OnInit } from '@angular/core';
import { getRandomNuberByRange } from '../../utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  avatars: string[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatpw: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  ngOnInit() {
    const numbers = Array.from({length: 24}, (_, i) => i + 1);
    this.avatars = numbers.map(_ => `avatars:svg-${getRandomNuberByRange(1, 16)}`);
  }

  // 注册
  onSubmit({value, valid}, ev: Event) {
    console.log('注册: ', value, valid);
  }

}
