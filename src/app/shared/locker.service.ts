import {Injectable} from '@angular/core';
import 'rxjs/Rx';
@Injectable()
export class LockerService {
  constructor () {
  }


  clear () {
    return window.localStorage.setItem('s', null);
  }

}


