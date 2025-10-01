import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),

      exhaustMap((action) =>
        this.authService.login(action.email, action.senha).pipe(
          map((response) =>
            AuthActions.loginSuccess({ token: response.token, user: response.user })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error: error.error })))
        )
      )
    )
  );
}
