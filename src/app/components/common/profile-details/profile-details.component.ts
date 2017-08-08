import { Component, OnInit } from '@angular/core';
import  { UserProfileService } from '../../views/start/user-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../services/auth-service/auth.service';


@Component({
  selector: 'tda-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

    open: boolean = false;
    profile: string[];
	  subscription: Subscription;
  	constructor(
  		private userProfileService: UserProfileService,
      private authService: AuthService
  	) { 
	  	

      this.subscription = this.authService.getProfile()
      .subscribe(profile => { this.profile = profile});
  	}

    ngOnInit() {
    }

    logout() {
      this.authService.logout()
    }

    openModalTask() {
     this.userProfileService.setModalTask(true)
    }

}
