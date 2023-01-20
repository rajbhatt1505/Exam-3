import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,map } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean {
        return this.checkAuth()
    }
    checkAuth(): any {
        return this.auth.user().pipe(
            map((res: any) => {
                if (res.success == true) {
                  
                    this.router.navigate(["/main"])
                    // console.log(res);
                    return true

                } else {
                    this.router.navigate([""])
                    return false
                }
            })
        )
    }

  
}
