import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      hashedPassword: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      alert('Formulário inválido');
      return;
    }

    this.http.post('http://localhost:8080/auth/register', this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Resposta do servidor:', response);

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao enviar dados para o servidor:', error);
      },
    });
  }
}
