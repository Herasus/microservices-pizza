import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/models/alert-type.model';
import { getApiErrorMessage } from 'src/app/utils/error-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  register() {
    this.submitted = true;
    if (!this.startForm.valid) return;

    this.loading = true;

    let credentials = this.startForm.getRawValue();

    this.auth.register(credentials)
      .then(res => {
        this.alerts.set(AlertType.SUCCESS, 'Vous avez bien été inscrit, vous pouvez maintenant vous connecter.', true);
        this.router.navigateByUrl('/login');
        this.loading = false;
      })
      .catch(err => {
        const error = getApiErrorMessage(err, {
          'The email already exists.': 'Un compte existe déjà avec cette adresse e-mail.'
        });
        this.alerts.set(AlertType.DANGER, error);
        this.loading = false;
      });
  }
}
