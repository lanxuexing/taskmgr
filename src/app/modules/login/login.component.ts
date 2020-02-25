import { LoginService, ToastService } from '@services/index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Quote } from '@models/index';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private toastService: ToastService
  ) {
    // 第二种：使用工厂方法
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
    this.route.queryParams.pipe(
      take(1),
      filter(result => result as any),
      tap(params => {
        this.form.patchValue({
          email: params.email,
          password: params.password
        });
      })
    ).subscribe();
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
    ev.preventDefault();
    this.loginService.login(value.email, value.password).pipe(
      take(1),
      tap(result => {
        if (result.msg) {
          this.toastService.toast(result.msg);
          return;
        }
        this.toastService.toast('登录成功～');
        this.router.navigate(['/project'], {queryParams: {
          userId: result.id
        }});
      })
    ).subscribe();
  }

}
