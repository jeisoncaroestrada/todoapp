import { Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private navService: NavService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
  	this.navService.changes.next(true);
   
  }

}
