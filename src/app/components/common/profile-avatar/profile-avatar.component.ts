import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tda-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit {
    @Input() public iconChange:boolean = true;

	  avatar: string = '/assets/images/default-avatar.jpg' ;
	 
  	constructor(
  	) { 
     
  	}

    ngOnInit() {
    }
}
