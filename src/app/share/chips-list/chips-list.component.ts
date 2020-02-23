import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { User } from '../../models';
import { ToastService, UserService } from '../../services';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ChipsListComponent), multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChipsListComponent), multi: true }
  ]
})
export class ChipsListComponent implements OnInit, Validator, ControlValueAccessor {
  @Input() placeholderText = '请输入成员email';
  @Input() label = '添加/修改成员';
  @Input() multiple = true;
  chipsCtr = new FormControl();
  chips: User[] = [];
  searchChips: User[] = [];
  memberResult$: Observable<User[]>;
  @ViewChild('chipsInput', { static: false }) chipsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  private propagateChange = (_: any) => {}; // 空函数体，真正使用的方法在 registerOnChange 中，由框架注册，我们仅需把变化 emit 回表单

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.memberResult$ = this.chipsCtr.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(item => item && item.length > 0),
      switchMap(str => this.userService.getUsersByEmail(str).pipe(
        tap(result => this.searchChips = result)
      ))
    );
  }

  // 自动完成输入框显示规则
  get displayInput() {
    return this.multiple || this.chips.length !== 0;
  }

  // 移除chips
  remove(user: User) {
    const ids = this.chips.map((item: User) => item.id);
    const idx = ids.indexOf(user.id);
    this.chips = this.multiple ? [...this.chips.slice(0, idx), ...this.chips.slice(idx + 1)] : [];
    this.chipsCtr.setValue('', {emitEvent: true});
    this.propagateChange(this.chips);
  }

  // 自动提示组件选择事件
  optionSelected(event: MatAutocompleteSelectedEvent) {
    const member = event.option.value;
    const isExist = this.chips.some(item => item.email == member.email);
    if (isExist) {
      this.toastService.toast('成员已经存在！');
      this.chipsInput.nativeElement.value = '';
      return;
    }
    this.chips = this.multiple ? [...this.chips, member] : [member];
    this.chipsInput.nativeElement.value = '';
    this.propagateChange(this.chips);
  }

  // 添加chips选项时
  add(event: MatChipInputEvent, trigger: MatAutocompleteTrigger): void {
    trigger.closePanel(); // 关闭AutoComplate触发器面板
    const input = event.input;
    const value = event.value || '';
    if (input) {
      input.value = '';
    }
    this.chips.push(...this.searchChips.filter(item => value.trim().indexOf(item.email)));
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  // 表单校验器（全局）
  validate(fc: FormControl): ValidationErrors {
    const val = fc.value;
    if (!val) {
      return null;
    }
    return { chipsInvalid: true };
  }

  // 写入控件值 --> 将模型中的新值写入视图或 DOM 属性中
  writeValue(obj: any): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((e, c) => ({...e, c}), {});
      if (this.chips) {
        const remainging = this.chips.filter(item => !userEntities[item.id]);
        this.chips = [...remainging, ...obj];
        this.chipsCtr.setValue(this.chips);
      }
    } else if (obj && !this.multiple) {
      this.chips = [...obj];
      this.chipsCtr.setValue(this.chips);
    }
  }

  // 当表单控件值改变的时候，函数fn被调用（相当于把变化 emit 回表单） --> 当控件接收到 change 事件后，调用的函数
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

}
