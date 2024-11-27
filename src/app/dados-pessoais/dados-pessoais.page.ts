import { Component } from '@angular/core';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage {
  nome: string = 'Nome Exemplo';
  dataNascimento: string = '1990-01-01';
  sexo: string = 'Masculino';
  email: string = 'email@example.com';

  constructor() {}
}
