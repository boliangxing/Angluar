import { Component, OnInit } from '@angular/core';
import { LoginService} from '../shared/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formModel: FormGroup;
  public errorMessage: string;
  public UserName: string;
  public PassWord: string;
  public Re_PassWord: string;
  public Code: number;
  constructor(private  loginService: LoginService, private router: Router) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      UserName: ['', Validators.minLength(6)],
      PassWord: ['', Validators.minLength(8)],
      Re_PassWord: ['', Validators.minLength(6)],
      Code: ['', Validators.minLength(4)]});
  }

  ngOnInit() {
  }
  onRegister () {
    this.UserName = this.formModel.value.UserName;
    this.PassWord = this.formModel.value.PassWord;
    this.Re_PassWord = this.formModel.value.Re_PassWord;
    this.Code = this.formModel.value.Code;
    this.loginService.register( this.UserName, this.PassWord , this.Re_PassWord , this.Code )
      .subscribe(
        res => {
          console.log(res);
          if (res.code == 0) {
            console.log(res.token);
            alert('注册成功');
            this.regsiterSuccessful();
          }
        },
        error => {
          if (error) {
            this.errorMessage = error.toString();
            console.log(this.errorMessage);
            alert('填写的信息有误。');
          }
        }
      );
  }
  Yzm() {
    alert('验证码已发送到您的手机, 请注意查收');
  }
  regsiterSuccessful () {
     this.router.navigate(['/login']);
  }
}
