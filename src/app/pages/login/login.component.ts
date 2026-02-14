import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { UserService } from '../../core/service/user.service';
import { Login } from '../../core/models/Login';
import { AuthUtils } from '../../core/utils/auth-utils'
import { ErrorUtils } from '../../core/utils/error-utils'

@Component({
  selector: 'app-login',
  imports: [CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private authUtils = inject(AuthUtils);
  private errorUtils = inject(ErrorUtils);
  private router = inject(Router);
  private user: Login = {
    login: '',
    password: ''
  }
  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    Object.keys(this.user).forEach((key) => {
      const typedKey = key as keyof Login;
      this.user[typedKey] = this.loginForm.get(key)?.value
    })

    this.userService.login(this.user)
      .pipe(this.errorUtils.returnErrorIfBadLoginOrPwd())
      .subscribe(jwt => {
          this.authUtils.setToken(jwt+'');
          this.router.navigate(['/students']);
        }
      )
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
