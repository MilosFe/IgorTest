import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CurencyComponent } from './curency/curency.component'
import { CurrencyEditComponent } from './curency/curency-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/currency',
    pathMatch: 'full'
  },
  {
    path: 'currency',
    component: CurencyComponent
  },

  {
    path: 'detail/:id',
    component: CurrencyEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [CurencyComponent, CurrencyEditComponent];
