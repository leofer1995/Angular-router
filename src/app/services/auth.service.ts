import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './../services/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User | null>(null); // creo el observer del manejo del estado del user
  user$ =  this.user.asObservable();//con esto le permitimos a los componentes que se puedan subscribir a user mediante user$ es decir creamos el observable
  // con esto user$ seria el store donde guardamos el state global del usuario y accederemos a el mediante el servicio de auth

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token)),
    );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap((user) => console.log(user, 'userrrrrrrrr')),
        tap(user => this.user.next(user)),
        tap(data => sessionStorage.setItem('user', JSON.stringify(data))) //luego emito un nuevo valor en el observer que cree para que lso componentes subcritos mediante user$ puedan
        // acceder al nuevo valor emitido 
      )
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      tap((data) => console.log(data)),
      switchMap(() => this.getProfile()),
    )
  }

  logout() {
    this.tokenService.removeToken();
  }
}
