import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
import { UserAuthStorage } from '../../services/user-auth-storage.service';
import { ResponseDialog } from '../../components/response-dialog/response-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  userAuthStorageService = inject(UserAuthStorage);

  constructor(private fb: FormBuilder, private authService: AuthService, public dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        console.log('Resposta do servidor:', response);
        let dialogRef = this.dialog.open(ResponseDialog, {
          data: { response: 'Logado com sucesso', success: true },
          width: '450px',
          height: '300px',
        });
      },
      error: (error) => {
        let dialogRef = this.dialog.open(ResponseDialog, {
          data: { response: error.error.message || 'Erro ao fazer login' },
          width: '450px',
          height: '300px',
        });
      },
    });
  }
}
