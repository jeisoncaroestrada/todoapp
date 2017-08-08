import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'tda-profile-cover',
  templateUrl: './profile-cover.component.html',
  styleUrls: ['./profile-cover.component.scss']
})
export class ProfileCoverComponent implements OnInit {
  @Input() public iconChange:boolean = true;


  constructor(
  ) { 
   
  }

  ngOnInit() {

  }

}
