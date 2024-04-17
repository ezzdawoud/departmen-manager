import { Component, OnInit } from '@angular/core';
import { DBservicesService } from '../services/dbservices.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { async } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  ngOnInit(): void {
      this.DB.getAllDepartment().subscribe((data:any)=>this.Department=data);
  }
  myForm:any;
birtDate:any=[];
  employees:any;
  genders:any;
  genderss: any[] = [
    { value: 'Male', title: 'Male' },
    { value: 'Female', title: 'Female' },
    { value: 'Others', title: 'Others' },
  ];
isUpdate=false;
  Department:any[]=[];
  allDepartment:any[]=[];
  progress: number | undefined;
  message: string | undefined;

  getDepartment(emp:any){
    
    let dep = this.Department.filter((x: any)=>x.depId==emp);
    if(dep.length===0){return ""}
    else{
     return dep[0].depName;}
  }

constructor(private DB:DBservicesService,private from:FormBuilder,private http:HttpClient,private datePipe: DatePipe){
  this.DB.getAllDepartment().subscribe((data:any)=>this.allDepartment=data);
  this.myForm = this.from.group({
    firstNmae: [""],
    lastName: [""],
    DepId: [""],
    Email: [""],
    password: [""],
    birth_data: [""],
    genders: [""],
    pic: [""]
  })
  this.DB.getAllEmployees().subscribe(data=>{
    this.employees=data;});

}
getAge(date:any){
return 2023-new Date(date).getFullYear();
}
delete(id:any){

  var r = confirm("Select an Action!");  
  if (r == true) {  
  

this.DB.deleteEmp(id).subscribe(data=>{ 
   this.DB.getAllEmployees().subscribe(data=>{
  this.employees=data;
});});
alert("employee deleted")

}
else {
  alert("employees does not deleted")
}
}
EmpIdForUpdate=0;
Employeesdata:any;
update(id:any){
 
  this.DB.getEmployees(id).subscribe(data=>{
 this.Employeesdata=data;
console.log(data)
    this.myForm.get("firstNmae").setValue(this.Employeesdata.firstNmae);
  this.myForm.get("lastName").setValue(this.Employeesdata.lastName);
  this.myForm.get("DepId").setValue(this.Employeesdata.depId);
  this.myForm.get("Email").setValue(this.Employeesdata.email);
  this.myForm.get("password").setValue(this.Employeesdata.password);
  this.myForm.get("birth_data").setValue(this.datePipe.transform(this.Employeesdata.birth_date, 'yyyy-MM-dd'));
  console.log(this.Employeesdata);
  if(this.Employeesdata.gender==="m"){
    this.myForm.get("genders").setValue("Male")
  }
  else{
    this.myForm.get("genders").setValue("Female")
  }
  
});


  this.isUpdate=!this.isUpdate;
this.EmpIdForUpdate=id;
}
addNewEmployees(file: any) {
  let dep=this.myForm.get("DepId").value;
  let depID:any;
   if(dep==="IT")
   depID=1;
  else if(dep==="Acc")
  depID=2
else
depID=3
  if (file.length === 0) {
    return;
  }
  let fileToUpload = <File>file[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  this.http.post('https://localhost:7240/api/Emp/upload', formData, { reportProgress: true, observe: 'events' })
    .subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
    console.log(depID)
  this.DB.getDepartment(depID).subscribe({
    next: (res) => {
      let check: any = res;
      this.DB.getNumberOfEmployees(depID).subscribe(data => {
        let number: any = data;
        if (check.maxEmployees > number[0]) {
          let gender = "";
          if (this.myForm.get("genders").value === "Male") {
            gender = "m";
          }
          else {
            gender = "f"
          }
          if (file.length === 0) {
            return;
          }


          let n = {
            "firstNmae": this.myForm.get("firstNmae").value,
            "lastName": this.myForm.get("lastName").value,
            "depId": depID,
            "email": this.myForm.get("Email").value,
            "password": this.myForm.get("password").value,
            "birth_date": `${this.myForm.get("birth_data").value}T09:45:31.863Z`,
            "gender": gender,
            "imageOfEmployees": this.myForm.get("pic").value.split('\\').pop().replace(/[.][^.]+$/, "")+"."+fileToUpload.type.split("/")[1],
          }

          this.DB.update(this.EmpIdForUpdate,n).subscribe({
            next: (res => {
              alert("Updated")
            }),
            error: (rej) => {
              alert("something wrong!")
            }
          })

        }
        else {
          alert("the department is full");
        }
      })
    }
  })
 }
}
