import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {filter} from 'rxjs/operator/filter';
@Injectable()
export class AnimalService {

  constructor(private  http: Http) { }
  getList (): Observable<any> {
    return this.http.get('/lumen/animal')
      .map(res => res.json())
      .catch(this.handleError);
  }
  private handleError (error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json() || '服务器错误');
    }
    return Observable.throw(error || '服务器错误');
  }

}
export class CallBack {
  constructor(
    public code: number,
    public message: string,
    public data: string[]
 ) {


  }


}

