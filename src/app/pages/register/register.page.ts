import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import FormControlBase from 'src/app/models/form/FormControlBase';
import { userRegistrationForm } from 'src/app/models/form/UserRegistrationForm';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import UserRegistrationInfo from '../../models/auth/UserRegistrationInfo';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;
  payload: UserRegistrationInfo;
  formData: FormControlBase[] = userRegistrationForm;

  constructor(private formService: FormService, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formService.toFormGroup(this.formData);
  }

  onSubmit(){
    this.payload = this.form.getRawValue();
    this.authService.registerUser(this.payload);
  }
}
