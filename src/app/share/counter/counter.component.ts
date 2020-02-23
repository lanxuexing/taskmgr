import { Component, OnInit, Input, Provider, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS, Validator
} from '@angular/forms';

// Registering the ControlValueAccessor
export const COUNTER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CounterComponent), // forwardRef 让我们可以在使用构造注入时，使用尚未定义的依赖对象类型
  multi: true // Multi providers 让我们可以使用相同的 Token 去注册多个 Provider
};

// Adding custom validation
export const validateCounterRange: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  return (control.value > 10 || control.value < 0)
         ? { rangeError: { current: control.value, max: 10, min: 0 } }
         : null;
};

// Registering the Custom Validator
export const COUNT_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useValue: validateCounterRange,
  multi: true // Multi providers 让我们可以使用相同的 Token 去注册多个 Provider
};

// Registering the Custom Validator To Directive
export const COUNT_VALIDATOR_TO_DIRECTIVE: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CounterComponent), // forwardRef 让我们可以在使用构造注入时，使用尚未定义的依赖对象类型
  multi: true // Multi providers 让我们可以使用相同的 Token 去注册多个 Provider
};

// validation factory
export function createCounterRangeValidator(maxValue: number, minValue: number) {
  return (control: AbstractControl): ValidationErrors => {
    return (control.value > +maxValue || control.value < +minValue)
           ? { rangeError: { current: control.value, max: maxValue, min: minValue } }
           : null;
  };
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    COUNTER_VALUE_ACCESSOR,
    // COUNT_VALIDATOR, // Metadata 元数据配置自定义验证器
    COUNT_VALIDATOR_TO_DIRECTIVE, // Metadata 元数据配置自定义验证器，绑定到指令上，组员是特殊的指令，即：Component extends Directive
  ]
})
export class CounterComponent implements OnInit, OnChanges, Validator, ControlValueAccessor {
  @Input() counterRangeMin: number; // 设置数据有效范围的最大值
  @Input() counterRangeMax: number; // 设置数据有效范围的最小值
  private mCount = 0;
  private mValidator: ValidatorFn; // 自定义验证函数
  private propagateChange = (_: any) => {}; // 空函数体，由框架注册，我们仅需把变化 emit 回表单
  // 属性修改器 set/get ，TypeScript才拥有
  get count() {
    return this.mCount;
  }

  set count(value: number) {
    this.mCount = value;
    this.propagateChange(value);
  }

  constructor() { }

  ngOnInit(): void { }

  // 监听输入属性变化，调用内部的 createValidator() 方法，创建 RangeValidator
  ngOnChanges(changes: SimpleChanges): void {
    if ('counterRangeMin' in changes || 'counterRangeMax' in changes) {
      this.createValidator();
    }
  }

  // 动态创建 RangeValidator
  private createValidator(): void {
    this.mValidator = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
 }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  // 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj !== undefined) { // 只有当合法值 (非 undefined、null、"") 写入控件时，覆盖默认值
      this.count = obj;
    }
  }

  // 设置当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
   this.propagateChange = fn;
  }

  // 设置当控件接收到 touched 事件后，调用的函数
  registerOnTouched(fn: any): void { }

  // 当控件状态变成 DISABLED 或从 DISABLED 状态变化成 ENABLE 状态时，会调用该函数。该函数会根据参数值，启用或禁用指定的 DOM 元素。
  setDisabledState?(isDisabled: boolean): void { }

  // 对提供的控件执行同步验证的方法
  validate(control: AbstractControl): ValidationErrors {
    return this.counterRangeMin == null || this.counterRangeMax == null ? null : this.mValidator(control);
  }

  // 注册一个回调函数以在验证器输入更改时调用
  registerOnValidatorChange?(fn: () => void): void { }

}
