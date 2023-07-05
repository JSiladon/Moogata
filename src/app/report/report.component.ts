import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { timer } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  bills:any;
  list:any;
  sum:any = 0;
  datetime:any;

  constructor(private router:Router ,private http:HttpClient) { 
    
  }
  ngOnInit(): void {
    timer(0,100).subscribe(()=>{
      this.datetime= new Date();
    })
    console.log('ok');
    this.http.get('http://localhost/moogata/bills').subscribe((data:any)=>{
      console.log(data);
      this.bills=data;
    })

  }
  selectbill(bid:any){
    this.http.get('http://localhost/moogata/lists/'+bid).subscribe((data:any)=>{
      console.log(data);
      this.list=data;

      let sumlist = 0;
      
      for(let i =0;i<data.length;i++){
        sumlist = sumlist + data[i].price*data[i].amount ;
      }
      this.sum = sumlist ;
    })
  }

  go_index(){
    this.router.navigateByUrl('')
  }
}
