import { Component, OnInit } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { AuthenticateService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  aulas: any[] = [];
  aulasFiltradas: any[] = [];
  userId: string | null = null;

  constructor(
    public aulaService: AulaService,
    public authService: AuthenticateService
  ) {}

  async ngOnInit() {
    this.carregarAulas();
    const user = await this.authService.getUser();
    this.userId = user ? user.id : null;
  }

  ionViewWillEnter() {
    this.carregarAulas();
  }

  carregarAulas() {
    this.aulaService.getAulas();
    this.aulas = this.aulaService.aulas;
    this.aulasFiltradas = this.aulas; // Inicialmente, aulasFiltradas contém todas as aulas
  }

  normalizarTexto(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  pesquisarAula(event: any) {
    const valor = this.normalizarTexto(event.target.value);
    this.aulasFiltradas = this.aulas.filter(aula => this.normalizarTexto(aula.nome).includes(valor));
  }

  isParticipating(aula: any): boolean {
    if (!aula.id_confirmados) {
      aula.id_confirmados = [];
    }
    return this.userId && aula.id_confirmados.includes(this.userId);
  }
}
