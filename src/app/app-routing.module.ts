import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nw3Component } from 'src/nw3/nw3.component';

const routes: Routes = [
    {//NW 3 BI PRESENTS NOMENCLATURE WORKSHOP V.3.0
      path: ':id',
      component: Nw3Component
    } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
