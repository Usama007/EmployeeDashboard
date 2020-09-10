import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { concat } from 'rxjs/internal/observable/concat';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  employees: any = [];
  index: any;
  empId: any = null;
  name: any = null;
  email: any = null;
  address: any = null;
  dob: any = null;
  designation: any = null;
  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, private router: Router) { }

  ngOnInit() {
    //alert(this.activatedRoute.snapshot.paramMap.get('emp_id'));

  }

  ionViewDidEnter() {
    this.empId = this.activatedRoute.snapshot.paramMap.get('emp_id');
    this.storage.get('emp_data').then((val) => {
      this.employees = val;

      for (var a = 0; a < this.employees.length; a++) {
        if (this.employees[a].emp_id == this.empId) {
          console.log(this.employees[a]);
          this.index = a;
          this.name = this.employees[a].name;
          this.email = this.employees[a].email;
          this.address = this.employees[a].address;
          // this.dob = this.employees[a].dob;
          this.dob = moment(this.employees[a].dob).format('DD,MM,YYYY');
          this.designation = this.employees[a].designation;
          break;
        }
      }
    });
  }

  delete() {
    this.employees.splice(this.index, 1);
    this.storage.set('emp_data', this.employees);
    this.router.navigate(['/home'])

  }
}
