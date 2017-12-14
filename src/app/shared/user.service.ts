import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
@Injectable()
export class UserService {
  private header: any;
  constructor(private  http: Http) { }
  userInfo (Token: string): Observable<any> {
    this.header = {
      Authorization: Token['Authorization'],
      Accept: 'application/vnd.lfrt.v1.0+json'
    }
    return this.http.post('/lumen/getUserInfo', Token, { headers : this.header})
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

