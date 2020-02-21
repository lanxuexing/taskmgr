import { Component, OnInit } from '@angular/core';
import { getRandomNuberByRange } from '../../utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService, ToastService } from '../../services';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  avatars: string[];
  form: FormGroup;

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
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit() {
    const numbers = Array.from({length: 24}, (_, i) => i + 1);
    this.avatars = numbers.map(_ => `avatars:svg-${getRandomNuberByRange(1, 16)}`);
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
        this.router.navigate(['/login']);
      })
    ).subscribe();
  }

}
