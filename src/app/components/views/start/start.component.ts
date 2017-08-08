import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service/user.service';
import  { UserProfileService } from './user-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { slideInBottom, swipeToTop } from '../../common/transitions/main.animations';

@Component({
  selector: 'tda-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  animations: [
    slideInBottom(),
    swipeToTop(),
    
  ]
})
export class StartComponent implements OnInit {
  cover = ''

  subscription: Subscription;
  constructor(
  		private userService: UserService,
      private userProfileService: UserProfileService,
  ) { 
    // se suscribe al triget que abre y cierra el modal para crear una nueva tarea
    this.subscription = this.userProfileService.getModalTask()
    .subscribe(openModalCreateTask => { 
      this.openModalCreateTask = openModalCreateTask;
    });



    

    // se suscribe al triget que abre y cierra el modal editar cover
    this.subscription = this.userProfileService.getModalCover()
    .subscribe(openModalEditCover => { 
      this.openModalEditCover = openModalEditCover;
    });

    // se suscribe al triget que abre y cierra el modal editar avatar
    this.subscription = this.userProfileService.getModalAvatar()
    .subscribe(openModalEditAvatar => { 
      this.openModalEditAvatar = openModalEditAvatar;
    });


     // se suscribe al triget que abre y cierra el modal editar los detalles de contacto
    this.subscription = this.userProfileService.getModalDetails()
    .subscribe(openModalEditDetails => { 
      this.openModalEditDetails = openModalEditDetails;
    });
      
  }

	model: User = new User();
	error = '';
  openModalCreateTask: boolean = false;
  openModalEditCover: boolean = false;
  openModalEditAvatar: boolean = false;
  openModalEditDetails: boolean = false;
  profileDetails: any = {};
	success = '';
	loading: boolean = false;


  ngOnInit() {

  	this.userService.getCurrentUser()
  	.subscribe(
        success => {
        	this.loading = false

          this.profileDetails = this.configDetails(success.current_user)

          this.userProfileService.setCover(success.current_user.cover)
          this.userProfileService.setAvatar(success.current_user.avatar)
          this.userProfileService.setDetails(this.profileDetails)
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

  //configura el los detalles del contacto
  configDetails(details){
      details = {
          'user': details,
          'contact_details': details.contact_details
      }
      return details;
  }

  //configura el nombre de usuario
  configName(details){
      let name = ''

      if (details.name1) name += details.name1
      if (details.name2) name +=  ' ' + details.name2
      if (details.lastname1) name += ' ' + details.lastname1
      if (details.lastname2) name += ' ' + details.lastname2 
      return name;
  }

}
