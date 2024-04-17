import { Inject, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DBservicesService } from '../services/dbservices.service';
export const adminGurdsGuard: CanActivateFn = (route, state) => {
  let IsAdmin=false;
  if(window.localStorage.getItem("emp")?.length!>0){
  if(localStorage.getItem("role")==="Admin"){
    IsAdmin=true;
  }
  else{
    IsAdmin=false;
  }
}
else{
  IsAdmin=false;
}
  return new Promise((res,rej)=>{
    if(IsAdmin.valueOf()){
      res(true);
    }
    else{
      res(false)
    }
  });
};
