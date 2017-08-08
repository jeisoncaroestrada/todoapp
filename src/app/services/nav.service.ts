import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class NavService {
  
  public changes  = new BehaviorSubject<boolean>(false);
  public searchText  = new BehaviorSubject<any>("");

}