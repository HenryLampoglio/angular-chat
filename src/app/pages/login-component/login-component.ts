import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      alert('Formulário inválido');
      return;
    }

    this.http.post('http://localhost:8080/auth/login', this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Resposta do servidor:', response);
      },
      error: (error) => {
        console.error('Erro ao enviar dados para o servidor:', error);
      },
    });
  }
}
