import { FormControl } from '@angular/forms';

export const stringNotEmptyValidator = (control: FormControl) => {
    const isEmpty = (control.value || '').trim().length === 0;
    const isValid = !isEmpty;
    return isValid ? null : { whitespace: true };
}

export default stringNotEmptyValidator;
