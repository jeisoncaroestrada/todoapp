import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { User } from '../../../models/User';
import { CONFIG } from '../../../routes/app.config';
import { slideToRight, slideToLeft, fadeIn } from '../../common/transitions/main.animations';

@Component({
	selector: 'tda-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [
	    slideToRight(),
	    slideToLeft(),
	    fadeIn(),
    ]
})

export class LoginComponent implements OnInit {

	model: User = new User();//instancia de usuario
	error = null;// mensaje de error
	loading: boolean = false;//indicador de carga o de procesamiento en el formulario
  	public mainTitle: string;//titulo principal de la aplicación
  	public passwordType: string = 'password';//muestra u oculta el password en el formulario


	constructor(
		private router: Router,
		private authenticationService: AuthService,
	) { }

	ngOnInit() {
		// -------------------------------------------------------------------------
		// Se valida si existe una session activa y redirige
		// -------------------------------------------------------------------------
		if (sessionStorage.getItem('token')) {
          this.router.navigate(['/login']);
        }
		this.mainTitle = CONFIG[0].appName
	}	

	// -------------------------------------------------------------------------
	// Función que envia los datos de inicio de session
	// -------------------------------------------------------------------------
	login() {
		this.loading = true;
		this.authenticationService.login(this.model)
		.subscribe(
            success => {

            	if (success) {
            		this.router.navigate(['/start']);
	            	this.loading = false
	            	this.error = null
            	}
            },
            error =>  {
            	this.loading = false
            	console.log(error);
            	
               	this.error = <any>error
			}
       	);
	}

	// -------------------------------------------------------------------------
	// Función para redirigir a una ruta especifica
	// -------------------------------------------------------------------------
	goTo(url: string) {
		this.router.navigate([url]);
	}

	// -------------------------------------------------------------------------
	// Función que cierra la notificación de error del formulario
	// -------------------------------------------------------------------------
	closeError() {
		this.error = null;
	}

	// -------------------------------------------------------------------------
	// Función muestra u oculta el password en el formulario
	// -------------------------------------------------------------------------
	switchPassword() {
		this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
	}

}
