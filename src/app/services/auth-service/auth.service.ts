import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from '../../models/User';
import { ApiService } from '../api-service/api.service';


@Injectable()
export class AuthService {
	private apiUrl = this.apiService.apiUrl;

	constructor(private http: Http, private apiService: ApiService, private router: Router) { }

	login(User: User): Observable<any> {

		let body = 'email=' + User.email + '&password=' + User.password;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('auth/login'), body, options)
			.map(this.getData)
            .catch(this.handleError);
	}

	getProfile(): Observable<any> {

		let body = 'token=' + this.getAuthorization();

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			headers.append('Authorization', 'Bearer ' + this.getAuthorization());
		let options = new RequestOptions({ 'headers': headers });

		return this.http.post(this.apiService.getUrl('profile'),body, options)
			.map(this.getData)
            .catch(this.handleError);
	}

	logout(): void {
		sessionStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	private handleError (error: Response | any) {
	    // mostrar los errores
	    let errMsg: string;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body.error || JSON.stringify(body);
	      errMsg = `${err}`;
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    return Observable.throw(errMsg);
  	}

	private getData(data: Response) {
		let data_response = data.json();
		console.log(data_response);
		if (data_response && data_response.token) {

			let expiration = new Date();
      		expiration.setMinutes(expiration.getMinutes() + 30);
			let content = {token: data_response.token, expires_at: expiration.getTime() }
			sessionStorage.setItem('token', JSON.stringify(content));
			return true;
		}
		return data_response;
	}

	//obtiene el token de autorizacion almacenado en la session
  	private getAuthorization() {
      if (sessionStorage.getItem('token')) {
        let storedToken = JSON.parse(sessionStorage.getItem('token'));
        return storedToken['token'];
      }
  	}

}
