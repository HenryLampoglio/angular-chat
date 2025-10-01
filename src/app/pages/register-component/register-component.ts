import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  passowrdCheckeds: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      hashedPassword: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(
            `(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=[\\]{};':"\\|,.<>/?-]).{8,}.*$`
          ),
        ],
      ],
      hashedPasswordConfirmation: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(
            `(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=[\\]{};':"\\|,.<>/?-]).{8,}.*$`
          ),
        ],
      ],
    });
    this.passowrdCheckeds = false;
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    const formData = this.registerForm.value;
    const { hashedPasswordConfirmation, ...dataToSend } = formData;

    this.authService.register(dataToSend).subscribe({
      next: (response) => {
        console.log('Resposta do servidor:', response);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: (error) => {
        console.error('Erro ao enviar dados para o servidor:', error);
      },
    });
  }

  checkPassowrds(): void {
    this.passowrdCheckeds =
      this.registerForm.get('hashedPassword')?.value ===
      this.registerForm.get('hashedPasswordConfirmation')?.value;
  }
}
