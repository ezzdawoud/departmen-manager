import { Component } from '@angular/core';
import { DBservicesService } from '../services/dbservices.service';
import { FormBuilder } from '@angular/forms';
import { window } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent {
  myForm: any;
  employees: any = {
    empID: 0
  };
  Department: any ;
  gender: any;
  AllDepartment: any = [];
  
  genderss: any[] = [
    { value: 'Male', title: 'Male' },
    { value: 'Female', title: 'Female' },
    { value: 'Others', title: 'Others' },
  ];
  progress: number | undefined;
  message: string | undefined;
  onUploadFinished: any;
  constructor(private DB: DBservicesService, private from: FormBuilder, private http: HttpClient) {
    this.DB.getAllDepartment().subscribe(data=>this.Department=data);
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

  }
  imageName:any;
  onFileSelected(event:any) {
    if(event.target.files.length > 0) 
     {
      this.imageName=event.target.files[0].name;
     }
   }
  addNewEmployees(file: any) {
   let dep=this.myForm.get("DepId").value;
  let depID:any;
  console.log(dep);
   if(dep==="IT")
   depID=1;
  else if(dep==="Acc")
  depID=2
else
depID=3
    this.DB.getDepartment(depID).subscribe({
      next: (res) => {
        let check: any = res;
        this.DB.getNumberOfEmployees(depID).subscribe(data => {
          let number: any = data;
          if (check.maxEmployees > number[0]) {
            let gender = this.myForm.get("genders");
            if (gender.value === "male") {
              gender = "m";
            }
            else {
              gender = "f"
            }
            if (file.length === 0) {
              return;
            }

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
            let n = {
              "firstNmae": this.myForm.get("firstNmae").value,
              "lastName": this.myForm.get("lastName").value,
              "depId": depID,
              "email": this.myForm.get("Email").value,
              "password": this.myForm.get("password").value,
              "birth_date": `${this.myForm.get("birth_data").value}T00:00:00.00Z`,
              "gender": gender,
              "imageOfEmployees": this.imageName
            }
            console.log(n)
            this.DB.addEmployees(n).subscribe({
              next: (res => {
                alert("add")
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

