import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import stringNotEmptyValidator from '../models/form/customValidators/StringNotEmptyValidator';
import FormControlBase from '../models/form/FormControlBase';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  toFormGroup(controls: FormControlBase[]){
    const group: any = {};

    controls.forEach(control => {
      const formControl = new FormControl();
      if(!(control.type === 'number')){
        formControl.addValidators(stringNotEmptyValidator);
      }
      if(control.required){
        formControl.addValidators(Validators.required);
      }
      if(control.type === 'email'){
        formControl.addValidators(Validators.email);
      }
      group[control.name] = formControl;
    });

    return new FormGroup(group);
  }
}
