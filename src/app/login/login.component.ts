import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DBservicesService } from '../services/dbservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
myForm:any;
isAdmin=false;
  constructor(private form:FormBuilder,private DB:DBservicesService,private Route:Router){
this.myForm=this.form.group({
  email:["",[Validators.required,Validators.email,Validators.maxLength(50),Validators.minLength(5)]],
  password:["",[Validators.required,Validators.minLength(5),Validators.maxLength(16)]]
})
  }
get email(){
  return this.myForm.get("email")
}
get password(){
  return this.myForm.get("password")
}
errorNmae="";
  test(){
if(this.email.touched && this.email.errors?.required || this.email.touched && this.email.errors?.email||this.password.touched && this.password.errors?.required || this.password.touched && this.password.errors?.minlength || this.password.touched && this.password.errors?.maxlength){
  
}
else{


   this.DB.getByEmail(this.email.value,this.password.value).subscribe({
    next:(res)=>{
    
      window.localStorage.setItem("emp",JSON.stringify(res));
      let employees:any=res;
      let Department:any;
      console.log(employees.empID)
      this.DB.getDepartment(employees.empID).subscribe(data=>{
  Department=data;
  console.log(Department)
  if(Department.depManger===employees.empID){
      this.DB.IsAdmin=true;
      localStorage.setItem("role","Admin");
      console.log(this.DB.IsAdmin)
  }
  else{
    localStorage.setItem("role","user");
    this.DB.IsAdmin=false;
  }
});
this.Route.navigate(["home"])
  },
error:(rej)=>{
this.errorNmae=rej.name;
}
});

}

}

}
