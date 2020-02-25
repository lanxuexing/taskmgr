import { startWith, map } from 'rxjs/operators';
import { Component, OnInit, Provider, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Address } from '@models/index';
import { Subject, Subscription, Observable, combineLatest, of } from 'rxjs';
import {
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { getProvince, getCitiesByProvince, getAreaByCity } from '@utils/index';
import { ErrorStateMatcher } from '@angular/material';

// 自定义错误匹配器
class IdentityErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && !control.value;
  }
}

// 注册 value accessor
export const ADDRESS_SELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddressSelectComponent),
  multi: true
};

// 注册 Validator
export const ADDRESS_SELECT_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AddressSelectComponent),
  multi: true
};

@Component({
  selector: 'app-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.scss'],
  providers: [
    ADDRESS_SELECT_VALUE_ACCESSOR,
    ADDRESS_SELECT_VALIDATOR
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressSelectComponent implements OnInit, Validator, ControlValueAccessor, OnDestroy {
  isDisabled = false; // 是否禁用表单控件
  provinces: any; // 省
  cities: any[]; // 市
  districts: any[]; // 区
  address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  // 数据流
  province = new Subject();
  city = new Subject();
  district = new Subject();
  street = new Subject();
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  addressSub: Subscription;
  errorMatcher = new IdentityErrorMatcher(); // 错误匹配器
  private propagateChange = (_: any) => {}; // 空函数体，由框架注册，我们仅需把变化 emit 回表单

  constructor() { }

  ngOnInit(): void {
    const province$ = this.province.asObservable().pipe(startWith(''));
    const city$ = this.city.asObservable().pipe(startWith(''));
    const district$ = this.district.asObservable().pipe(startWith(''));
    const street$ = this.street.asObservable().pipe(startWith(''));
    const val$ = combineLatest(
      [province$, city$, district$, street$],
      (pr: string, c: string, dist: string, st: string) => ({ province: pr, city: c, district: dist, street: st })
    );
    this.addressSub = val$.subscribe((address: Address) => this.propagateChange(address));
    this.provinces$ = of(getProvince());
    this.cities$ = province$.pipe(
      map((p: string) => getCitiesByProvince(p))
    );
    this.districts$ = combineLatest(province$, city$, (pr: string, c: string) => getAreaByCity(pr, c));
  }

  // 省份变更
  onProvinceChange(): void {
    this.address.city = '';
    this.address.district = '';
    this.province.next(this.address.province);
  }

  // 城市变更
  onCityChange(): void {
    this.address.district = '';
    this.city.next(this.address.city);
  }

  // 区县变更
  onDistrictChange(): void {
    this.district.next(this.address.district);
  }

  // 街道地址变更
  onStreerChange(): void {
    this.street.next(this.address.street);
  }

  // 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj) { // 只有当合法值 (非 undefined、null、"") 写入控件时，覆盖默认值
      this.address = obj;
      if (this.address.province) {
        this.province.next(this.address.province);
      }
      if (this.address.city) {
        this.city.next(this.address.city);
      }
      if (this.address.district) {
        this.district.next(this.address.district);
      }
      if (this.address.street) {
        this.street.next(this.address.street);
      }
    }
  }

  // 设置当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // 设置当控件接收到 touched 事件后，调用的函数
  registerOnTouched(fn: any): void { }

  // 当控件状态变成 DISABLED 或从 DISABLED 状态变化成 ENABLE 状态时，会调用该函数。该函数会根据参数值，启用或禁用指定的 DOM 元素。
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // 对提供的控件执行同步验证的方法
  validate(control: AbstractControl): ValidationErrors {
    const val = control.value as Address;
    if (!val) { return null; }
    if (val.province && val.city && val.district && val.street) { return null; }
    return { addressError: { msg: '地址选择/输入有误～' } };
  }

  // 注册一个回调函数以在验证器输入更改时调用
  registerOnValidatorChange?(fn: () => void): void { }

  ngOnDestroy() {
    if (this.addressSub) {
      this.addressSub.unsubscribe();
    }
  }

}
