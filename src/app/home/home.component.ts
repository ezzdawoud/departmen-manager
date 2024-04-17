import { Component } from '@angular/core';
import { DBservicesService } from '../services/dbservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  employees:any;
Department:any={
  depName:"",
    maxEmployees:"",
    imageOfDepartment:"",
    depManger:"",
};
isAdmin=false;
  constructor(private DB:DBservicesService){
if(window.localStorage.getItem("emp")?.length!>0){
this.employees=JSON.parse(window.localStorage.getItem("emp")!);
 this.DB.getDepartment(this.employees.depId).subscribe(data=>{
  console.log(data)

  this.Department=data;
  if(this.Department.depManger===this.employees.empID){
   this.isAdmin=true;
  this.DB.IsAdmin=true;
  
  }
  else{
    this.isAdmin=false;
    this.DB.IsAdmin=false;

  }
});


}
}
}
