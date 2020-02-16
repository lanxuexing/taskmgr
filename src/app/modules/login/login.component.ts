import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    // 第二种：使用工厂方法
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // 第一种：直接new FormControl
    // this.form = new FormGroup({
    //   email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    //   password: new FormControl('', Validators.required)
    // });
  }

  // 登录
  onSubmit(from: FormGroup, ev: Event) {
    console.log('登录: ', from, ev);
  }

}
