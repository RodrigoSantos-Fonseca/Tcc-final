import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarAulaPage } from './criar-aula.page';

const routes: Routes = [
  {
    path: '',
    component: CriarAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarAulaPageRoutingModule {}
