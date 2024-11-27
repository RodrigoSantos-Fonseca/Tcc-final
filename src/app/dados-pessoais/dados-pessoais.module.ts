import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadosPessoaisPageRoutingModule } from './dados-pessoais-routing.module';

import { DadosPessoaisPage } from './dados-pessoais.page';
import { TabsModule } from '../shared/template/tabs/tabs.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadosPessoaisPageRoutingModule,
    TabsModule,
  ],
  declarations: [DadosPessoaisPage]
})
export class DadosPessoaisPageModule {}
