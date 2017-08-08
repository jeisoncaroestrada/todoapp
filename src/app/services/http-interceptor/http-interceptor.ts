import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptor extends Http {

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router
  ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
    
  // Implement POST, PUT, DELETE HERE
  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  post(url: string,body: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.post(this.getFullUrl(url),this.requestBody(body), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Request body.
   * @param body
   * @returns any
   */
  private requestBody(body?: any): any {
    if (body == null) {
      body = '';
    }
    return body;
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.getAuthorization()
      });
    }
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    return environment.apiEndpoint + url;
  }

  /**
   * Before any Request.
   */
  private beforeRequest(): void {
    //se valida que el token de sesion exista y no este expirado
    this.validateToken()
  }

  /**
   * After any request.
   */
  private afterRequest(): void {
    //do something
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    //do something
    return Observable.throw(error);
  }

  /**
   * onSuccess
   * @param res
   */
  private onSuccess(res: Response): void {
    //se valida que el token de sesion exista y no este expirado
    this.validateToken()
  }

  /**
   * onError
   * @param error
   */
  private onError(error: any): void {
    const body = error.json() || '';
    if (body.message == 'Session has expired') {
      //si el token esta vencido se borra y se redirecciona al /login
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.afterRequest();
  }

  //obtiene el token de autorizacion almacenado en la session
  private getAuthorization() {
      if (sessionStorage.getItem('token')) {
        let storedToken = JSON.parse(sessionStorage.getItem('token'));
        console.log(storedToken.token);
        return storedToken.token;
      }
  }


  private validateToken(): void {
    //se valida que el token de sesion exista y no este expirado
    if (sessionStorage.getItem('token')) {
      let storedToken = JSON.parse(sessionStorage.getItem('token'));

      let now = new Date();
      let expires_at = storedToken['expires_at']
      let expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 30);

      if (now.getTime() < expires_at) {
        //si el token es valido se reunueva la sesion por 30 minutos mas
        storedToken['expires_at'] = expiration.getTime()
        sessionStorage.removeItem('token');
        let content = {token: storedToken['token'], expires_at: expiration.getTime() }
        sessionStorage.setItem('token', JSON.stringify(content));
      }else{
        //si el token esta vencido se borra y se redirecciona al /login
         sessionStorage.removeItem('token');
         this.router.navigate(['/login']);
      }
    }
  }

}