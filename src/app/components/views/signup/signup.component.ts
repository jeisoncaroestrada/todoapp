import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../models/User';
import { CONFIG } from '../../../routes/app.config';
import { slideToRight, slideToLeft, fadeIn } from '../../common/transitions/main.animations';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
	selector: 'tda-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	animations: [
	    slideToRight(),
	    slideToLeft(),
	    fadeIn(),
    ]
})

export class SignupComponent implements OnInit {

	model: User = new User();//instancia de usuario
	success :string = '';//mensaje de éxito
	error :string = '';// mensaje de error
	loading: boolean = false;//indicador de carga o de procesamiento en el formulario
  	public mainTitle: string;//titulo principal de la aplicación
  	public passwordType: string = 'password';//muestra u oculta el password en el formulario



	constructor(
		private router: Router,
		private signupService: UserService,
		private authenticationService: AuthService,
	) { 

	}

	ngOnInit() {
		this.mainTitle = CONFIG[0].appName
	}	

	signup() {
		this.loading = true;
		this.signupService.create(this.model)
		.subscribe(
            success => {
            	this.loading = false
            	this.success = <any>success.success
            	this.error = ''
            	this.model = new User()
            },
            error =>  {
            	this.loading = false
               	this.error = <any>error
               	this.success = ''
			}
       	);
	}

	goTo(url: string) {
		this.router.navigate([url]);
	}


	closeError() {
		this.error = '';
	}

	switchPassword() {
		this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
	}

	closeSuccess() {
		this.success = '';
	}

}
