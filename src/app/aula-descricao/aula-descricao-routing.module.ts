import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AulaDescricaoPage } from './aula-descricao.page';

const routes: Routes = [
  {
    path: '',
    component: AulaDescricaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AulaDescricaoPageRoutingModule {}
