import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { fail } from 'assert';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  providers: [DatePipe]
})
export class FormPage implements OnInit {
  submitBtnDisabled:boolean = true;
  form: any = { dob: "", emp_id: 0 };
  data: any = [];
  param: any;
  index: any;
  isUpdate: boolean = false;
  constructor(public datepipe: DatePipe, private storage: Storage, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.param = this.activatedRoute.snapshot.paramMap.get('param');

    this.storage.get('emp_data').then((val) => {
      if (val != null) {
        this.data = val;
        if (this.param != "insert") {
          this.getData();
        }
      }
    });
  }

  getData() {

    this.isUpdate = true;
    this.form.dob = "";
    for (var a = 0; a < this.data.length; a++) {
      if (this.data[a].emp_id == this.param) {
        console.log(moment(this.data[a].dob).format('YYYY-MM-DDTHH:mm:ss'))
        this.index = a;
        this.form.name = this.data[a].name;
        this.form.email = this.data[a].email;
        this.form.address = this.data[a].address;
        this.form.dob = this.data[a].dob;
        this.form.designation = this.data[a].designation;
        break;
      }
    }
  }



  logForm() {
    if (this.isUpdate) {
      this.form.emp_id = this.data[this.index].emp_id;
      this.data[this.index] = this.form;
      this.storage.set('emp_data', this.data);
      this.router.navigate(['/detail/' + this.param])
    } else {
      // this.form.dob = this.datepipe.transform(this.form.dob, 'dd,MM,yyyy');
      if (this.data.length > 0) {
        this.form.emp_id = this.data[this.data.length - 1].emp_id + 1;
      }

      this.data.push(this.form);
      console.log("Local array: ", this.data);
      this.storage.set('emp_data', this.data);
      this.form = {};
    }

  }


  // logForm() {
  //   // // // this.form.dob = this.datepipe.transform(this.form.dob, 'dd,MM,yyyy');
  //   // // // console.log(this.form);
  //   // // // if (this.data.length != 0) {
  //   // // //   this.form.emp_id = this.data[this.data.length - 1].emp_id;
  //   // // //   this.form.emp_id = this.form.emp_id + 1;
  //   // // // }

  //   // // // console.log(this.form);

  //   // // // this.data.push(this.form);

  //   // // // this.storage.set('emp_data', this.data);

  //   // // // console.log(this.data);
  //   // // this.storage.get('emp_data').then((val) => {
  //   // //   if (val != null) {
  //   // //     this.data = val;
  //   // //   }
  //   // // });

  //   // // let temp = this.form;
  //   // // temp.dob = this.datepipe.transform(this.form.dob, 'dd,MM,yyyy');
  //   // // if (this.data.length != 0) {
  //   // //   temp.emp_id = this.data[this.data.length - 1].emp_id;
  //   // //   temp.emp_id = this.form.emp_id + 1;
  //   // // }
  //   // // this.form = temp;
  //   // // this.data.push(this.form);
  //   // // this.storage.set('emp_data', this.data);
  //   // // console.log(this.data);

  //   // this.storage.get('emp_data').then((val) => {
  //   //   if (val != null) {
  //   //     this.data = val;
  //   //     console.log(this.data);
  //   //   }
  //   // });
  //   // this.form.dob = this.datepipe.transform(this.form.dob, 'dd,MM,yyyy');
  //   // this.form.emp_id = this.form.emp_id + 1;

  //   // for(let a =0;a<this.data.length;a++){
  //   //   this.data[a] = this.for
  //   // }
  //   // // this.data.push(this.form);
  //   // this.storage.set('emp_data', this.data);
  //   // console.log(this.form);
  //   // console.log(this.data);


  // }

}
