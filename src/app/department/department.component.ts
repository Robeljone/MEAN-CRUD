import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department: any= [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh()
  {
    this.http.get<any>(environment.api_ur+'department').subscribe(data=>{
      this.department = data;
    })
  }
  
}
