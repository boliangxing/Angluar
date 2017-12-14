import { Component, OnInit } from '@angular/core';
import { UserService} from '../shared/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  private title: string;
  public userInfo: any;
  constructor( private router: Router, private userService: UserService) { }
  ngOnInit() {
    this.title = '个人空间';
    if ( this.get('Token') == null) {
      this.router.navigate(['/login']);

    }else {
      this.userService.userInfo(this.get('Token'))
        .subscribe(
          res => {
            console.log(res);

            if (res.code == 0) {
              this.userInfo = res.data.item;
              console.log(this.userInfo);
            }
          }
        );
    }
  }
  get (key?: string) {
    const itemString = window.localStorage.getItem(key)
    if (!itemString) {
      return null;
    }
    const itemObj = JSON.parse(itemString)
    if (!key || !itemObj) {
      return itemObj;
    }
    return itemObj[key] ? itemObj[key] : itemObj;
  }

  clear () {

    return window.localStorage.setItem('Token', null);
  }

}
