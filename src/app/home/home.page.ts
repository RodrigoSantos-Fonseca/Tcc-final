import { Component, OnInit } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { AuthenticateService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  aulas: any[] = [];
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
  }

  isParticipating(aula: any): boolean {
    if (!aula.id_confirmados) {
      aula.id_confirmados = [];
    }
    return this.userId && aula.id_confirmados.includes(this.userId);
  }
}
