import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import UserLoginInfo from 'src/app/models/auth/UserLoginInfo';
import FormControlBase from 'src/app/models/form/FormControlBase';
import { userLoginForm } from 'src/app/models/form/UserLoginForm';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  payload: UserLoginInfo;
  formData: FormControlBase[] = userLoginForm;

  constructor(private formService: FormService, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formService.toFormGroup(this.formData);
  }

  onSubmit() {
    this.payload = this.form.getRawValue();
    this.authService.login(this.payload);
  }
}
