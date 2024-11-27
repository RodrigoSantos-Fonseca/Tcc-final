import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarAulaPageRoutingModule } from './criar-aula-routing.module';

import { CriarAulaPage } from './criar-aula.page';
import { HeaderModule } from '../shared/template/header/header.module';
import { TabsModule } from '../shared/template/tabs/tabs.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarAulaPageRoutingModule,
    HeaderModule,
    TabsModule,

  ],
  declarations: [CriarAulaPage]
})
export class CriarAulaPageModule {}
