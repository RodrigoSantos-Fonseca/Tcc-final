import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AulaDescricaoPageRoutingModule } from './aula-descricao-routing.module';

import { AulaDescricaoPage } from './aula-descricao.page';
import { HeaderModule } from '../shared/template/header/header.module';
import { TabsModule } from '../shared/template/tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AulaDescricaoPageRoutingModule,
    HeaderModule,
    TabsModule
  ],
  declarations: [AulaDescricaoPage]
})
export class AulaDescricaoPageModule {}
