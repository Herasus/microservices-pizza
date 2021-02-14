import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { AuthService } from "app/services/auth.service";
import { getApiErrorMessage } from "app/utils/error-message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    try {
      await this.authService.login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value,
      );

      this.router.navigateByUrl('order');
    } catch (err) {
      console.log(err);
      const error = getApiErrorMessage(err, {
        'Not an admin': "Vous n'êtes pas un administrateur.",
        "Bad credentials": "Vos identifiants sont incorrects.",
      });
      this.alertService.showNotification('bottom', 'right', 'danger', error);
    }
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.loginForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.loginForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }
}