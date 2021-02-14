import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/models/alert-type.model';
import { getApiErrorMessage } from 'src/app/utils/error-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  startForm: FormGroup;

  submitted: boolean = false;

  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alerts: AlertService
  ) {
    this.startForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    console.log(this.alerts.alerts);
  }

  login() {
    this.submitted = true;
    if (!this.startForm.valid) return;

    this.loading = true;

    this.alerts.clear();

    let credentials = {
      email: this.startForm.controls.email.value,
      password: this.startForm.controls.password.value
    };

    this.auth.signin(credentials)
      .then(res => {
        this.router.navigateByUrl('/');
        this.loading = false;
        console.log('YOYO');
      })
      .catch(err => {
        this.alerts.set(AlertType.DANGER, getApiErrorMessage(err, { 'Bad credentials': 'Vos identifiants sont incorrects.' }));
        this.loading = false;
        console.log('TOTOTO');
      });
  }
}
