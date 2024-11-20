import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [InputComponent, ButtonComponent, CommonModule, ReactiveFormsModule], // Adiciona ReactiveFormsModule aqui
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    console.log('Login form', this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login attempt', { email, password });
    } else {
      console.log('Form is invalid');
    }
  }
}
