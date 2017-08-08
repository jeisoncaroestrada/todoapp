import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Task } from '../../models/Task';
import { UserProfile } from '../../models/UserProfile';
import { UserPassword } from '../../models/UserPassword';
import { CurrentUserPassword } from '../../models/CurrentUserPassword';
import { ApiService } from '../api-service/api.service';
import { HttpInterceptor } from '../http-interceptor/http-interceptor';


@Injectable()
export class TaskService {
	private apiUrl = this.apiService.apiUrl;

	constructor(
		private http: Http,
	 	private apiService: ApiService,
	 	private httpInterceptor: HttpInterceptor
	) { }

	/* ---------------------- CREAR TAREA --------------------------------------*/
	//crea una tarea en la base de datos
	create(Task: Task): Observable<any> {

		/*let body = 'name=' + Task.name
			+ '&priority=' + Task.priority
			+ '&due_date=' + Task.due_date;
			+ '&token=' + this.getAuthorization();*/

		let body = 'token=' + this.getAuthorization()
				+'&name=' + Task.name
				+ '&priority=' + Task.priority
				+ '&due_date=' + Task.due_date;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('create_task'), body, options)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- LISTAR TAREAS --------------------------------------*/
	//listar las tareas creadas por el usuario logueado
	index(): Observable<any> {

		let body = 'token=' + this.getAuthorization();
		
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('tasks'), body, options)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- ELIMINAR UNA TAREA --------------------------------------*/
	updateTask(Task: Task): Observable<any> {
		let taskId = Task.id
		let body = 'token=' + this.getAuthorization()
				+'&name=' + Task.name
				+ '&priority=' + Task.priority
				+ '&due_date=' + Task.due_date;


		return this.httpInterceptor.post('update_task/' + taskId, body)
			.map(this.extractData)
            .catch(this.handleError);
	}

  	/* ---------------------- ELIMINAR UNA TAREA --------------------------------------*/
	deleteTask(Task: Task): Observable<any> {
		let taskId = Task.id
		let body = 'token=' + this.getAuthorization();


		return this.httpInterceptor.post('delete_task/' + taskId, body)
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
	      errMsg = err;
	     
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    return Observable.throw(errMsg);

  	}

  	//obtiene el token de autorizacion almacenado en la session
  	private getAuthorization() {
      if (sessionStorage.getItem('token')) {
        let storedToken = JSON.parse(sessionStorage.getItem('token'));
        return storedToken['token'];
      }
  	}

}
