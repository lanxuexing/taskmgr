import { Component, OnInit } from '@angular/core';
import { getRandomNuberByRange } from '../../utils';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService, ToastService } from '../../services';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { validateCounterRange } from '../../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  avatars: string[];
  form: FormGroup;
  tabSelectIndex = 1; // 默认选中账号信息
  // 计数器，NgModel 用于从作用域创建一个 FormControl 实例，并将它绑定到一个表单控件元素。ngModel 继承自 NgControl。
  // 模版驱动表单：template-driven form ==> [ngModel]="outerCounterValue" 设置组件初始值，需要引入：FormsModule
  // 模版驱动表单：template-driven form ==> [(ngModel)]="outerCounterValue" 设置数据双向绑定，需要引入：FormsModule
  // 响应式表单：reactive forms ==> ，[formGroup]="form" formControlName="counter"，需要引入：ReactiveFormsModule
  // 响应式表单：reactive forms ==> ，[formControl]="counter"，需要引入：ReactiveFormsModule
  outerCounterValueSingle = new FormControl(5);
  outerCounterValue = 5;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatpw: ['', Validators.required],
      avatar: ['', Validators.required],
      dateOfBirth: ['1999-10-21', Validators.required],
      // identity: [ {value: { identityNo: '110105199910212584', identityType: 0}, disabled: true }], // 禁用证件控件的写法
      identity: [ { identityNo: '110105199910212584', identityType: 0 }],
      // outerCounterValue: [5, validateCounterRange], // 设置validateCounterRange验证器
      outerCounterValue: [5], // 设置validateCounterRange验证器（验证器在指令上）
    });
  }

  ngOnInit() {
    const numbers = Array.from({length: 24}, (_, i) => i + 1);
    this.avatars = numbers.map(_ => `avatars:svg-${getRandomNuberByRange(1, 16)}`);
  }

  show() {
    console.log(this.form.get('identity'));
  }

  // 注册
  onSubmit({value}, ev: Event) {
    ev.preventDefault();
    if (value.password !== value.repeatpw) {
      this.toastService.toast('两次密码输入不一致～');
      return;
    }
    delete value.repeatpw;
    this.loginService.register(value).pipe(
      take(1),
      tap(result => {
        if (result.msg) {
          this.toastService.toast(result.msg);
          return;
        }
        this.toastService.toast('注册成功～');
        this.router.navigate(['/login'], {queryParams: {
          email: value.email,
          password: value.password
        }});
      })
    ).subscribe();
  }

}
