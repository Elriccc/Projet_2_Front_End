import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { UserService } from '../../core/service/user.service';
import { Register } from '../../core/models/Register';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, MaterialModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private user: Register = {
    firstName: '',
    lastName: '',
    login: '',
    password: ''
  }
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    Object.keys(this.user).forEach((key) => {
      const typedKey = key as keyof Register;
      this.user[typedKey] = this.registerForm.get(key)?.value
    })
    this.userService.register(this.user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => { this.router.navigate(['/login']);},);
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
