import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from'@angular/common/http'
import {HttpParams} from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBservicesService {
 IsAdmin=false;
  
  constructor(private Db:HttpClient) { }
  public getByEmail(Email:any,passwrod:any){
let parms=new HttpParams().set("email",Email).set("password",passwrod);
return this.Db.get(`https://localhost:7240/api/Emp/email/password/${Email}/${passwrod}`);
    
  }
  public getDepartment(id:any){
return this.Db.get(`https://localhost:7240/api/Dep/id/`+id);
  }
  public getAllEmployees(){
    return this.Db.get("https://localhost:7240/api/Emp")
  }
  public getEmployees(id:any){
    return this.Db.get(`https://localhost:7240/api/Emp/${id}`);
  }
  public deleteEmp(id:any){
    return this.Db.delete(`https://localhost:7240/api/Emp/${id}`)
  }
  
public addEmployees(emp:any){
  return this.Db.post("https://localhost:7240/api/Emp",emp);
}
 
public getNumberOfEmployees(id:any){
  return this.Db.get(`https://localhost:7240/api/Dep/n/${id}`);
}
public getAllDepartment(){
  return this.Db.get("https://localhost:7240/api/Dep");
}
public update(id:any,emp:any){
return this.Db.put(`https://localhost:7240/api/Emp/${id}`,emp);
}
public updateDepartment(id:any,dep:any){
 return this.Db.put(`https://localhost:7240/api/Dep/update/${id}`,dep);
}
}
