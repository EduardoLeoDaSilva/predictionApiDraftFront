import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatiscasComponent } from './grafico/estatiscas/estatiscas.component';

const routes: Routes = [
  {path: 'graficos', component: EstatiscasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
