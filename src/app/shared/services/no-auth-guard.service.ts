import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NbAuthService } from '@nebular/auth';


@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: NbAuthService,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        this.router.navigate(['pages/dashboard']);
      }
    });
    const authenticated = await this.authService.isAuthenticated().toPromise();
    return !authenticated;
  }
}
