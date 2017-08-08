import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'tda-panel-modal',
  templateUrl: './panel-modal.component.html',
  //styleUrls: ['./panel-modal.component.scss'],
  styles : [`
        :host {
          min-width: 100%;
          height: 100%;
          top: 0;
          z-index: 1050;
          background: #ffffff;
        }
	    `, `

	    .overlay{

	  	width: 100%;
	  	height: 100%;
	  	position: absolute;
	  	z-index: 1050;
    

	    }
		.icon-close{
		    position: absolute;
		    font-size: 35px;
		    top: 20px;
		    right: 20px;
		    color: rgba(0,0,0,0.2);
		    cursor: pointer;
		    z-index: 2000;


		    @media(min-width: $screen-xs-min){ 
		      top: 30px;
		      right: 30px;
		    }
		}

	    .icon-close:hover{
	      color: rgba(0,0,0,0.5);
	    }

	    .main-container{
		    min-height: 100%;
		    width: 100%;
		    position: absolute;
		    top: 0;
		    left: 0;
		}
	    `
    ]
})
export class PanelModalComponent implements OnInit {
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeModal(){
  	this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
