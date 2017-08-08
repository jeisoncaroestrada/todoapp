import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { fadeInOut } from './components/common/transitions/main.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInOut(),
  ]
})

export class AppComponent {
	routeloading = false

   

    constructor(private router: Router) {
      

    	this.router.events
         .filter(e => e instanceof   NavigationStart)     
         .pairwise()
         .subscribe((e) => { 
         	this.routeloading = true
     	}); 

        this.router.events
         .filter(e => e instanceof   NavigationStart)     
         .pairwise()
         .subscribe((e) => { 
         	this.routeloading = false
     	});

		  this.router.events
	  	.subscribe((event) => {
		    if (event instanceof NavigationStart) {
		     this.routeloading = true
		    }
	  	});

      this.router.events
	  	.subscribe((event) => {
		    if (event instanceof NavigationEnd) {
		      this.routeloading = false
		    }
	  	});

    }
}
