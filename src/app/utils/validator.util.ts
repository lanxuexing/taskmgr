import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

// Adding custom validation (计数器值范围验证器)
export const validateCounterRange: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    return (control.value > 10 || control.value < 0)
           ? { rangeError: { current: control.value, max: 10, min: 0 } }
           : null;
};

// 密码校验器
export function createEqualPasswordValidator(passwordFormControlName: string, confirmPasswordFormControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
        const condition = formGroup.get(passwordFormControlName).value !== formGroup.get(confirmPasswordFormControlName).value;
        return condition ? { passwordsDoNotMatch: true } : null;
    };
}
