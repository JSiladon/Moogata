import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ConfirmationService]
})
export class IndexComponent implements OnInit {
  datetime: any;
  displayModal: boolean = false;
  displayModal2: boolean = false;

  name: any;
  price: any;
  index: any;
  id: any;
  amount: any = [1, 1, 1, 1];

  sum: any = 0;

  data_list: any = [];

  hi_btn: boolean = true;


  constructor(private router: Router, private http: HttpClient, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    timer(0, 100).subscribe(() => {
      this.datetime = new Date();
    })
    this.ref();

  }
  go_report() {
    this.router.navigateByUrl('/report')
  }
  showModalDialog1(name: any, price: any, index: any) {
    this.name = name;
    this.price = price;
    this.index = index;

    this.displayModal = true;

  }
  showModalDialog2(name: any, price: any, index: any) {
    this.name = name;
    this.price = price;
    this.index = index;

    this.displayModal = true;
  }
  showModalDialog3(name: any, price: any, index: any) {
    this.name = name;
    this.price = price;
    this.index = index;

    this.displayModal = true;
  }
  showModalDialog4(name: any, price: any, index: any) {


    this.name = name;
    this.price = price;
    this.index = index;

    this.displayModal = true;
  }
  showModalDialog5(index: any, name: any, price: any, amount: any) {

    this.name = name;
    this.price = price;

    this.amount[this.index] = amount;

    this.displayModal2 = true;

    this.id = index;

  }
  async rowdel() {
    console.log("del");
    this.displayModal2 = false;
    let del = await this.http.delete('http://localhost/moogata/lists/' + this.id).toPromise();
    this.ref();

  }

  plus() {
    this.amount[this.index]++;

  }
  minus() {
    if (this.amount[this.index] - 1 >= 1) {
      this.amount[this.index]--;
    }
  }
  async addlist() {
    this.displayModal = false;
    this.hi_btn = true;
    let list = {
      namepush: this.name,
      pricepush: this.price,
      amountpush: this.amount[this.index]
    }

    let insertlist = await this.http.post('http://localhost/moogata/lists', JSON.stringify(list)).toPromise();

    let selecttlist = await this.http.get('http://localhost/moogata/lists').toPromise();

    console.log(selecttlist);

    this.data_list = selecttlist;

    //   {
    //     namepush: this.name,
    //     pricepush: this.price,
    //     amountpush: this.amount[this.index]

    //   }
    // )

    this.sum += this.price * this.amount[this.index];

    this.ref();
  }

  nowbid: any;

  async pay() {
    this.hi_btn = false;
    let pricesum = { sum: this.sum }
    let insertbill = await this.http.post('http://localhost/moogata/bills', JSON.stringify(pricesum)).toPromise();


    let gettbill = await this.http.get('http://localhost/moogata/bills/getID').toPromise();

    console.log(gettbill);

    let jsonString = JSON.stringify(gettbill);
    let jsonObj = JSON.parse(jsonString);

    console.log(jsonObj[0].bid);
    this.nowbid = jsonObj[0].bid;

    // for (let i = 0; i < this.data_list.length; i++) {
    //   let insertlist = await this.http.post('http://localhost/moogata/lists', this.data_list[i]).toPromise();
    //   console.log("insert");
    // }

    let setID = { bid: this.nowbid }

    let setnowID = await this.http.post('http://localhost/moogata/lists/upbid', JSON.stringify(setID)).toPromise();
  }
  confirm() {
    this.confirmationService.confirm({
      message: 'ยืนยัน การชำระค่าอาหาร ?',
      header: 'ยืนยัน',
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        this.pay();
        this.clearlists();
      }
    });
  }
  clearlists() {
    this.data_list.splice(0, this.data_list.length);
    this.sum = 0;
    this.amount = [1, 1, 1, 1];
  }
  async ref() {
    console.log("F5");
    let selecttlist = await this.http.get('http://localhost/moogata/lists').toPromise();
    this.data_list = selecttlist;
    let sum_re = 0;

    for (let i = 0; i < this.data_list.length; i++) {
      sum_re = this.data_list[i].price * this.data_list[i].amount + sum_re;
    }

    this.sum = sum_re;
    if (this.data_list.length <= 0) {
      this.hi_btn = false;
    }
  }
  async update() {
    this.displayModal2 = false;
    let uplist = {
      amount: this.amount[this.index]
    }
    let updatelist = await this.http.post('http://localhost/moogata/lists/' + this.id, JSON.stringify(uplist)).toPromise();
    this.ref();
  }

}