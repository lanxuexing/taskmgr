import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Adding custom validation (计数器值范围验证器)
export const validateCounterRange: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    return (control.value > 10 || control.value < 0)
           ? { rangeError: { current: control.value, max: 10, min: 0 } }
           : null;
};
