import { inject } from '@angular/core';
import { AuthService } from './../Services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  if (!authService.authenTicated) {

    router.navigate(['/login']);

    return false;
  }

  return true;
};
