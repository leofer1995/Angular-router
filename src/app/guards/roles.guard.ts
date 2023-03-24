import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private route: Router,
  ) {}
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = JSON.parse(sessionStorage.getItem('user') || '');
    if(user?.role === 'admin'){
      return true;
    }
    return false;
      // return this.authService.user$
      // .pipe(
      //   map(user => {
      //     console.log(user)
      //     if(user?.role == 'admin'){
      //       return true;
      //     }
      //     this.route.navigate(['/home'])
      //     return false;
      //   })
      // )
  }
  
}
