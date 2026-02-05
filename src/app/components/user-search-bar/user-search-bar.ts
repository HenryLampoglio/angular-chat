import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { ConnectionService } from '../../services/connection.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-search-bar',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-search-bar.html',
  styleUrl: './user-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchBar implements OnInit {
  searchUsers = new FormControl('');

  private userSubject = new BehaviorSubject<any[]>([]);
  users$ = this.userSubject.asObservable();

  isLoading = false;

  private userService = inject(UserService);
  private connectionService = inject(ConnectionService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.searchUsers.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((value) => value ?? ''),
        tap(() => (this.isLoading = true)),
        switchMap((value: string) => {
          if (!value || value.length < 3) {
            this.isLoading = false;
            return of([]);
          }

          return this.userService.searchUsers(value).pipe(finalize(() => (this.isLoading = false)));
        }),
      )
      .subscribe((users) => this.userSubject.next(users));
  }

  sendInvite(receiverId: string): void {
    const loadingSnack = this.snackBar.open('Enviando convite...', 'Fechar');

    this.connectionService.sendInvite(receiverId).subscribe({
      next: () => {
        loadingSnack.dismiss();

        this.snackBar.open('Convite enviado com sucesso!', 'OK', {
          duration: 30000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });

        const currentList = this.userSubject.value;
        const updatedList = currentList.filter((user) => user.id !== receiverId);
        this.userSubject.next(updatedList);
      },
      error: (error) => {
        loadingSnack.dismiss();

        this.snackBar.open('Erro ao enviar convite', 'Tentar novamente', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        console.error('Erro ao enviar convite:', error);
      },
    });
  }
}
