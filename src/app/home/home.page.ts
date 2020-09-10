import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  employees: any = [];
  constructor(private storage: Storage) { }
  ngOnInit() {

  }

  ionViewDidEnter() {
    this.storage.get('emp_data').then((val) => {
      this.employees = val;
      // console.log(this.employees);
    });
  }

}
