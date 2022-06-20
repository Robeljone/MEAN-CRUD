import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee:any= [];
  constructor(private http:HttpClient) { }
  profilepicpath = environment.photo_url;
  ngOnInit(): void {
    this.refresh();
  }

  refresh()
  {
    this.http.get<any>(environment.api_ur+'employee').subscribe(data=>{
      this.employee = data;
    })
  }
  modalTitle = "";
  Empid = 0;
  EmpName ="";
  Dateof ="";
  Depart = "";
  profilepic = "";

  addclick()
  {
    this.modalTitle = "Add New Employee";
    this.Empid = 0;
  };
  editclick()
  {
    this.modalTitle = "Edit Employee";
   
  };
   createClick(){
    var val = {
      EmployeeId:this.Empid,
      EmployeeName: this.EmpName,
      Department: this.Depart,
      DateofJoining: this.Dateof,
      ProfileImg: this.profilepic
    }
   }

   updateClick(){
    var val = {
      EmployeeId:this.Empid,
      EmployeeName: this.EmpName,
      Department: this.Depart,
      DateofJoining: this.Dateof,
      ProfileImgPath: this.profilepic
    }
   }
}
