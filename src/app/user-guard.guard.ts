import { CanActivateFn } from '@angular/router';
import { AuthUtils } from './core/utils/auth-utils'
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const utils = inject(AuthUtils)
  return utils.isAuthenticated();
};
