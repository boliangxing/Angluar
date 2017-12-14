import { Component, OnInit } from '@angular/core';
import { LoginService} from '../shared/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  public errorMessage: string;
  constructor(private  loginService: LoginService, private router: Router) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      UserID: ['', Validators.minLength(6)],
    LogonPass: ['', Validators.minLength(8)]
  });
}

  ngOnInit() {

  }

  onLogin () {
    this.loginService.login(this.formModel.value.UserID, this.formModel.value.LogonPass)
      .subscribe(
        res => {
          console.log(res);
          if (res.code == 0) {
            console.log(res.code);
            this.loginSuccessful(res.data);
          }
        },
        error => {
          if (error) {
            this.errorMessage = error.toString();
            console.log(this.errorMessage);
          }
        }
      );
  }

  loginSuccessful (data) {
    this.set({Authorization : 'Bearer ' + data.token})
    window.location.reload();
    this.router.navigate(['/space']);
  }
  set (itemObj: any) {
    const parse = itemObj => {
      if (!itemObj) {
        return JSON.stringify({});
      }
      if (typeof itemObj === 'object') {
        return JSON.stringify(itemObj);
      }
      return JSON.stringify({data: itemObj});
    }

    return window.localStorage.setItem('Token', parse(itemObj));
  }

}
