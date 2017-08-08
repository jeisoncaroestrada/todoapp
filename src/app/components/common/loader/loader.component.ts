import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tda-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() public position:string = 'fixed';
  @Input() public background:string = '#fff';
  @Input() public text:string ;

  constructor() { }

  ngOnInit() {
  }

}
