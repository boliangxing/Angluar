import { Component, OnInit } from '@angular/core';
import {AnimalService} from '../shared/animal.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  private  animalList: any;
  public errorMessage: string;
  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.animalService.getList()
      .subscribe(
        res => {
          console.log(res);
          if (res.code == 0) {
            this.animalList = res.data.items;
            console.log(res.data.item);
          }
        },
        error => {
          if (error) {
            this.errorMessage = error.toString();
            console.log(this.errorMessage);
            alert('填写的信息有误。');
          }
        });
  }

}
