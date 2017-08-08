import {trigger, state, animate, style, transition, keyframes} from '@angular/core';

/*export function routerTransition() {
  return slideToLeft();
}*/

export function slideToRight() {
  return trigger('slideToRight', [
    state('void', style({position:'relative', width:'100%', top: '0'}) ),
    state('*', style({position:'relative', width:'100%', top: '0'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}

export function personal() {
  return trigger('personal', [
    state('product', style({left:'0',position:'relative',margin: '0'}) ),
    state('void', style({left:'-100%',position:'relative',margin: '0'}) ),
    state('work', style({left:'0',position:'relative',margin: '0'}) ),
    transition('void => product', [
      style({left:'-100%'}),
      animate('0.5s ease-in-out', style({left:'0%'}))
    ]),
    transition('product => void', [
      style({left:'0%'}),
      animate('0.5s ease-in-out', style({left:'-100%'}))
    ]),
    transition('product => work', [
      style({left:'0%'}),
      animate('0.5s ease-in-out', style({left:'-100%'}))
    ]),
    transition('void => work', [
      style({left:'100%'}),
      animate('0.5s ease-in-out', style({left:'0%'}))
    ]),
  ]);
}


export function personal2() {
  return trigger('personal', [
    state('test', style({position:'absolute', width:'100%'}) ),
    state('prueba', style({position:'absolute', width:'100%'}) ),
    transition('test => prueba', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition('prueba => test', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}
export function slideToLeft() {
  return trigger('slideToLeft', [
    state('void', style({position:'relative', width:'100%', top:'0%', right: '-0%'}) ),
    state('*', style({position:'relative', width:'100%', top:'0%', right: '-0%'}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

export function slideToBottom() {
  return trigger('slideToBottom', [
    state('void', style({position:'absolute', width:'100%', height:'100%'}) ),
    state('*', style({position:'absolute', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

export function slideInBottom() {
  return trigger('slideInBottom', [
    state('void', style({position:'absolute'}) ),
    state('*', style({position:'absolute'}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}

export function slideInTop() {
  return trigger('slideInTop', [
    state('void', style({position:'absolute'}) ),
    state('*', style({position:'absolute'}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

export function accordion() {
  return trigger('accordion', [
    state('close', style({'max-height':'0'}) ),
    state('open', style({'max-height':'9999px'}) ),
    transition(':enter', [
      style({transform: 'scaleY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'scaleY(100%)'}))
    ]),
    transition(':leave', [
      style({transform: 'scaleY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'scaleY(0%)'}))
    ])
  ]);
}

export function slideToTopx() {
  return trigger('slideToTop', [
    state('void', style({position:'absolute', width:'100%', height:'100%'}) ),
    state('*', style({position:'absolute', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}

export function slideToTop() {
  return trigger('slideToTop', [
    state('void', style({position:'relative', width:'100%', top: '0'}) ),
    state('*', style({position:'relative', width:'100%', top: '0'}) ),
    transition(':enter', [
      style({transform: 'translatey(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translatey(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translatey(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translatey(100%)'}))
    ])
  ]);
}

export function fadeInOutr() {
  return trigger('fadeInOutr', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.5s ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('0.5s ease-in-out', style({ opacity: 0 }))
    ])
  ]);
}

export function fadeInOut() {
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.3s ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('0.3s ease-in-out', style({ opacity: 0 }))
      /*animate("1s", keyframes([
        style({ opacity: 1, offset: 0  }), // offset = 0
        style({ opacity: 1, offset: 0.5  }), // offset = 0.5
        style({ opacity: 0, offset: 1  }) // offset = 1
      ]))*/
    ])
  ]);
}

export function swipeToTop() {
  return trigger('swipeToTop', [
    state('void', style({position:'fixed',}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)', opacity: 0}),
      animate('1s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
    ]),
    state('*', style({position:'fixed'}) ),
    transition(':leave', [
      style({transform: 'translateY(0%)', opacity: 1}),
      animate('1s ease-in-out', style({transform: 'translateY(100%)', opacity: 0}))
    ])
  ]);
}



export function fadeIn() {
// trigger name for attaching this animation to an element using the [@triggerName] syntax
  return trigger('fadeIn', [

      // route 'enter' transition
      transition(':enter', [

          // css styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 1 }))
      ]),
  ]);
}

export function fadeOut() {
// trigger name for attaching this animation to an element using the [@triggerName] syntax
  return trigger('fadeOut', [
      // route 'enter' transition
      transition(':leave', [
      style({ opacity: 1 }),
      animate('0.5s ease-in-out', style({ opacity: 0 }))
    ])
  ]);
}