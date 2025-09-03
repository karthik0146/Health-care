import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const routeguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if(!token){
    router.navigate(['/login']);
  }
  return true;
};
