import { startWith } from 'rxjs/operators';
import { Component, OnInit, forwardRef, ChangeDetectionStrategy, OnDestroy, Injector } from '@angular/core';
import { MatSelectChange, ErrorStateMatcher } from '@angular/material';
import {
  Validator,
  ControlValueAccessor,
  NG_VALIDATORS, NG_VALUE_ACCESSOR,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroupDirective,
  NgForm,
  NgControl
} from '@angular/forms';
import { IdentityType, Identity } from '../../models';
import { Subject, Observable, combineLatest, Subscription } from 'rxjs';

// 自定义错误匹配器
class IdentityErrorMatcher implements ErrorStateMatcher {
  mControl: FormControl | null;
  constructor(control: FormControl | null) {
    this.mControl = control;
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && !this.mControl.valid;
  }
}

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => IdentityInputComponent), multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => IdentityInputComponent), multi: true }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, Validator, ControlValueAccessor, OnDestroy {
  identityTypes: {value: IdentityType, label: string}[] = [ // 证件类型
    { value: IdentityType.Idcard, label: '身份证' },
    { value: IdentityType.Insurance, label: '医保' },
    { value: IdentityType.Passport, label: '护照' },
    { value: IdentityType.Military, label: '军官证' },
    { value: IdentityType.Other, label: '其他' }
  ];
  identity: Identity = {identityNo: null, identityType: null}; // 证件对象
  identityType$ = new Subject<IdentityType>();
  identityNo$ = new Subject<string>();
  identitySub: Subscription;
  private propagateChange = (_: any) => {}; // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单

  get identityType(): Observable<IdentityType> {
    return this.identityType$.asObservable().pipe(
      startWith(IdentityType.Idcard)
    );
  }

  get indentityNo(): Observable<string> {
    return this.identityNo$.asObservable().pipe(
      startWith('0')
    );
  }

  // 错误匹配器
  get errorMatcher() {
    const model = this.injector.get(NgControl);
    return new IdentityErrorMatcher(model.control);
  }

  constructor(
    private injector: Injector
  ) { }

  ngOnInit() {
    const val$ = combineLatest(
      this.indentityNo,
      this.identityType,
      (identityNo: string, identityType: IdentityType) => ({identityNo, identityType })
    );
    this.identitySub = val$.subscribe((identity: Identity) => {
      this.propagateChange(identity);
    });
  }

  // 证件类型选择
  onSelectChange(event: MatSelectChange) {
    const idType = event.value;
    this.identityType$.next(idType);
  }

  // 证件号码
  onInputChane(identiryNo: string) {
    this.identityNo$.next(identiryNo);
  }

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }

  // 当表单控件值改变的时候，函数fn被调用（相当于把变化 emit 回表单） --> 当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  // 对提供的控件执行同步验证的方法
  validate(control: AbstractControl): ValidationErrors {
    const val = control.value as Identity;
    if (!val) { return null; }
    switch (val.identityType) {
      case IdentityType.Idcard:
        return this.validateIdCard(control);
      case IdentityType.Passport:
        return this.validatePassport(control);
      case IdentityType.Military:
        return this.validateMilitary(control);
      case IdentityType.Insurance:
      case IdentityType.Other:
      default: {
        return null;
      }
    }
  }

  // 身份证验证器
  validateIdCard(control: AbstractControl): ValidationErrors {
    const value = control.value.identityNo;
    if (value.length !== 18) {
      return { identityError: { msg: '身份证号码输入错误～' } };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(value) ? null : { identityError: { msg: '身份证号码输入错误～' } };
  }

  // 护照验证器
  validatePassport(control: AbstractControl): ValidationErrors {
    const value = control.value.identityNo;
    if (value.length !== 9) {
      return { identityError: { msg: '护照号码输入错误～' } };
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(value) ? null : { identityError: { msg: '护照号码输入错误～' } };
  }

  // 军官证验证器
  validateMilitary(control: AbstractControl): ValidationErrors {
    const value = control.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(value) ? null : { identityError: { msg: '军官证号码输入错误～' } };
  }

  ngOnDestroy() {
    if (this.identitySub) {
      this.identitySub.unsubscribe();
    }
  }

}
