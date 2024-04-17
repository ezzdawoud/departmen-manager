import { Component, Input } from '@angular/core';
import { DBservicesService } from '../services/dbservices.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() IsAdmin=false;
  isLogin=false;
  constructor(){
this.checks();
  }
  checks(){
    if(window.localStorage.getItem("emp")?.length!>0){
      this.isLogin=true;
    }
    else{
      this.isLogin=false;
    }
  
    
  }
  lgoout(){
    window.localStorage.removeItem("emp");
    this.isLogin=false;
  }
}
