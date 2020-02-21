import { LoginService } from './../../services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Quote } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
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
    this.quote$ = this.loginService.getQuote();
  }

  // 登录
  onSubmit({value}, ev: Event) {
    console.log('登录: ', value, ev);
    ev.preventDefault();
    this.loginService.login(value.email, value.password).subscribe();
  }

}
