import { Component } from '@angular/core';
import { DBservicesService } from '../services/dbservices.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  department: any = [{
    depName: "",
    maxEmployees: "",
    imageOfDepartment: "",
    depManger: "",
  }];
  numberOfEmployees: any = [];
  isUpdate = false;
  nameOfmanger: any = []
  myForm: any;
  getManger(id:any){
let manger=this.nameOfmanger.filter((x:any)=>x.empID==id);
console.log(manger)
if(manger.length===0){
  return ""
}
else{
return manger[0].firstNmae;}
  }
  constructor(private DB: DBservicesService, private form: FormBuilder) {
    this.DB.getAllDepartment().subscribe(data => {
      this.department = data;
      for (let dep of this.department) {
        this.DB.getNumberOfEmployees(dep.depId).subscribe(data => this.numberOfEmployees.push(data));
        this.DB.getAllEmployees().subscribe(data => this.nameOfmanger=data);
      }
    });
    this.myForm = this.form.group({
      depName: [""],
      maxEmployees: [""],
      imageOfDepartment: [""],
      depManger: [""],

    })
  }

  departmentId: any;
  update(id: any) {
    this.DB.getDepartment(id).subscribe(data => {
      let department: any = data;
      this.myForm.get("depName").setValue(department.depName);
      this.myForm.get("maxEmployees").setValue(department.maxEmployees);
      this.myForm.get("imageOfDepartment").setValue(department.imageOfDepartment);
      this.myForm.get("depManger").setValue(department.depManger);

    });
    this.departmentId = id;
    this.isUpdate = !this.isUpdate;
  }

  updatedepartment() {

    let n = {
      "depName": this.myForm.get("depName").value,
      "maxEmployees": this.myForm.get("maxEmployees").value,
      "imageOfDepartment": this.myForm.get("imageOfDepartment").value,
      "depManger": this.myForm.get("depManger").value
    }
    this.DB.getDepartment(this.departmentId).subscribe(data => {
      let check: any = data;
      this.DB.getNumberOfEmployees(this.departmentId).subscribe(data => {
        let number: any = data;
        console.log(check.maxEmployees,n.maxEmployees)
        if (n.maxEmployees > number[0]) {
          this.DB.updateDepartment(this.departmentId, n).subscribe({
            next: (res) => {
              this.department = res;
              alert("updated");
            }

          , error: (rej) => {
            alert("something wrong!")
          }
        });}
        else {
          alert("the number is les than the number of employees")
        }
      })
  });
  }
}
