import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {filter} from 'rxjs/operator/filter';
@Injectable()
export class LoginService {

  constructor(private  http: Http) { }
  login (UserID: string, LogonPass: string): Observable<any> {
    return this.http.post('/lumen/login', JSON.stringify({mobile: UserID , password: LogonPass}))
      .map(res => res.json())
      .catch(this.handleError);
  }
  register (username: string, password: string, re_password: string, code: number): Observable<any> {
    return this.http.post('/lumen/register'
      , JSON.stringify({username: username , password: password, re_password: re_password, code: code}))
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

