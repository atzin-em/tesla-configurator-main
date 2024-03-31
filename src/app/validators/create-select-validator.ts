import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createSelectValidator<T>(options: T[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = options.some(option => option === control.value);
        return isValid ? null : { invalidSelection: true };
    };
}
  