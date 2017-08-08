import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from '../../models/User';
import { UserProfile } from '../../models/UserProfile';
import { UserPassword } from '../../models/UserPassword';
import { CurrentUserPassword } from '../../models/CurrentUserPassword';
import { Detail } from '../../models/Detail';
import { ApiService } from '../api-service/api.service';
import { HttpInterceptor } from '../http-interceptor/http-interceptor';


@Injectable()
export class UserService {
	private apiUrl = this.apiService.apiUrl;

	constructor(
		private http: Http,
	 	private apiService: ApiService,
	 	private httpInterceptor: HttpInterceptor
	) { }

	/* ---------------------- CREAR USUARIO --------------------------------------*/
	//crea un usuario en la base de datos
	create(User: User): Observable<any> {

		let body = 'email=' + User.email
			+ '&password=' + User.password
			+ '&password_confirmation=' + User.password_confirmation;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('signup'), body, options)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- ACTUALIZAR USUARIO --------------------------------------*/
	//actualiza un usuario en la base de datos
	updateUser(User: UserProfile): Observable<any> {
		
		let profile = new UserProfile(User)
		let body = 'name1=' + profile.name1
			+ '&name1=' + profile.name1
			+ '&name2=' + profile.name2
			+ '&lastname1=' + profile.lastname1
			+ '&lastname2=' + profile.lastname2
			+ '&telephone=' + profile.telephone
			+ '&phone=' + profile.phone
			+ '&user_name=' + User.user_name;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			headers.append('Authorization', this.getAuthorization());
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('api/v1/current_user/update'), body, options)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- SOLICITAR CAMBIO DE CONTRASEÑA --------------------------------------*/
	//envia la solicitud de restablecimiento de contraseña
	recover_password(User: User): Observable<any> {

		let body = 'email=' + User.email

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('recover_password'), body, options)
				.map(this.extractData)
                .catch(this.handleError);
	}

	/* ---------------------- ACTUALIZAR LA CONTRASEÑA --------------------------------------*/
	//actualiza el password del usuario
	update_password(User: UserPassword): Observable<any> {

		let body = 'token=' + User.token
			+ '&password=' + User.password
			+ '&password_confirmation=' + User.password_confirmation

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('update_password'), body, options)
				.map(this.extractData)
                .catch(this.handleError);
	}

	/* ---------------------- ACTUALIZA LA CONTRASEÑA DEL USUARIO ACTUAL --------------------------------------*/
	//actualiza el password del usuario
	update_current_password(User: CurrentUserPassword): Observable<any> {

		let body = 'current_password=' + User.current_password
			+ '&password=' + User.password
			+ '&password_confirmation=' + User.password_confirmation

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			headers.append('Authorization', this.getAuthorization());
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('api/v1/update_current_password'), body, options)
				.map(this.extractData)
                .catch(this.handleError);
	}

	/* ---------------------- DATOS DEL USUARIO ACTUAL --------------------------------------*/
	//se obtiene los datos del usuario logueado
	getCurrentUserb(): Observable<any> {

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			headers.append('Authorization', this.getAuthorization());
		let options = new RequestOptions({ 'headers': headers });


		return this.http.get(this.apiService.getUrl('api/v1/current_user'), options)
			.map(this.extractData)
            .catch(this.handleError);
	}











	/* ---------------------- DATOS DEL USUARIO ACTUAL --------------------------------------*/
	//se obtiene los datos del usuario logueado
	getCurrentUser(): Observable<any> {

		/*let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
			headers.append('Authorization', this.getAuthorization());
		let options = new RequestOptions({ 'headers': headers });*/
		//let options = new RequestOptions();
		let body = 'token=' + this.getAuthorization();
		return this.httpInterceptor.get('/current_user')
			.map(this.extractData)
            .catch(this.handleError);
	}












	/* ---------------------- CREA UN DETALLE DE CONTACTO DEL USUARIO ACTUAL --------------------------------------*/
	createContactDetail(Detail: Detail): Observable<any> {
		let body = 'detail_type=' + Detail.detail_type
			+'&value=' + Detail.value
			+ '&text=' + Detail.text
			+ '&name=' + Detail.name

		return this.httpInterceptor.post('api/v1/details', body)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- ACTUALIZAR UN DETALLE DE CONTACTO DEL USUARIO ACTUAL --------------------------------------*/
	updateContactDetail(Detail: Detail): Observable<any> {
		let deatilId = Detail.uid
		let body = 'detail_type=' + Detail.detail_type
			+'&value=' + Detail.value
			+ '&text=' + Detail.text
			+ '&name=' + Detail.name

		return this.httpInterceptor.post('api/v1/details/update/' + deatilId, body)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- ELIMINAR UN DETALLE DE CONTACTO DEL USUARIO ACTUAL --------------------------------------*/
	deleteContactDetail(Detail: Detail): Observable<any> {
		let deatilId = Detail.uid
		let body = 'detail_type=' + Detail.detail_type
			+ '&value=' + Detail.value
			+ '&name=' + Detail.name


		return this.httpInterceptor.post('api/v1/details/delete/' + deatilId, body)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- GUARDAR IMAGEN DE PERFIL --------------------------------------*/
	updateAvatar(avatar: any): Observable<any> {
		console.log(avatar);
		let body = 'avatar=' + avatar


		return this.httpInterceptor.post('api/v1/update_avatar', body)
			.map(this.extractData)
            .catch(this.handleError);
	}

	
	//extrae los datos del resultado de la peticion HTTP
	private extractData(res: Response) {
		//obtener los datos
	    let body = res.json();
	    return body || { };
  	}

  	//obtiene los mensajes de error del resultado de la peticion HTTP
  	private handleError (error: Response | any) {
	    // mostrar los errores
	    let errMsg: Array<any>;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body || JSON.stringify(body);
	      //errMsg = `${err}`;
	      errMsg = err;
	      /*err.forEach(function(e) {
			    
	      	errMsg.push(e)
		  });*/
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    return Observable.throw(errMsg);

	    /*let body = error.json();
	    return Observable.throw(body);*/
  	}

  	//obtiene el token de autorizacion almacenado en la session
  	private getAuthorization() {
      if (sessionStorage.getItem('token')) {
        let storedToken = JSON.parse(sessionStorage.getItem('token'));
        return storedToken['token'];
      }
  	}

}
