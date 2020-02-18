import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ImageSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ImageSelectComponent), multi: true }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSelectComponent implements OnInit, Validator, ControlValueAccessor {
  @Input() title: string; // 标题
  @Input() cols = 6; // 列数
  @Input() data: string[] = []; // 数据
  @Input() useSvgIcon = false; // 是否使用svg头像
  @Input() imageWidth = '64px'; // 图片作为的头像的默认宽度是64px
  private selected: string; // 当前选中的头像
  private propagateChange = (_: any) => {}; // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单

  constructor() { }

  ngOnInit() { }

  // 选择头像
  onSelect(index: number) {
    this.selected = this.data[index];
    this.propagateChange(this.selected);
  }

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.selected = obj;
    }
  }

  // 当表单控件值改变的时候，函数fn被调用（相当于把变化 emit 回表单） --> 当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  // 自定义校验器
  validate(fc: FormControl): {[key: string]: any} {
    return fc.value ? null : {
      imageSelectInvlid: {
        valid: false
      }
    };
  }

}
