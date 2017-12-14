import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private Token: boolean;
  private NoToken: boolean;
  constructor(private router: Router) { }

  ngOnInit() {

    if ( this.get('Token') == null) {
      this.NoToken = true;
      this.Token = false;

    }else {
      this.Token = true;
      this.NoToken = false;
    }
  }
  clear () {
    window.localStorage.setItem('Token', null);
    window.location.reload();
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
}
