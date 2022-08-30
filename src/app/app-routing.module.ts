import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';

const routes: Routes = [
  { path:'',component:ListPropertiesComponent },
  { path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
