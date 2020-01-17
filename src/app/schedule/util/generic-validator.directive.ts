import { AbstractControl, ValidatorFn } from '@angular/forms';

export function genericValidator(regexp: RegExp): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {
        const valid = regexp.test(control.value);
        return !valid ? {formatoInvalido: {value: control.value}} : null;
    };
}
