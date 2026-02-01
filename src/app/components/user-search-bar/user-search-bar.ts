import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search-bar',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-search-bar.html',
  styleUrl: './user-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchBar implements OnInit {
  searchUsers = new FormControl('');
  users$!: Observable<any[]>;
  isLoading = false;

  private userService = inject(UserService);

  ngOnInit(): void {
    this.users$ = this.searchUsers.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map((value) => value ?? ''),
      tap(() => (this.isLoading = true)),
      switchMap((value: string) => {
        if (!value || value.length < 3) {
          this.isLoading = false;
          return of([]);
        }

        // O ERRO ESTAVA AQUI:
        // Em vez de retornar valueChanges, chame o método do seu SERVICE
        return this.userService.searchUsers(value).pipe(finalize(() => (this.isLoading = false)));
      }),
    );
  }
}
