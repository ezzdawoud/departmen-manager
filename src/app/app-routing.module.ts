import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { adminGurdsGuard } from './gurds/admin-gurds.guard';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"admin",component:AdminComponent,canActivate:[adminGurdsGuard]},
  {path:"addEmployees",component:AddEmployeesComponent,canActivate:[adminGurdsGuard]},
  {path:"department",component:DepartmentComponent,canActivate:[adminGurdsGuard]},
  { path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
