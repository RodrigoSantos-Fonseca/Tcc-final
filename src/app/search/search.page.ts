import { Component, OnInit, OnDestroy } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { AuthenticateService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  aulas: any[] = [];
  aulasFiltradas: any[] = [];
  userId: string | null = null;
  private aulaSubscription: Subscription | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    public aulaService: AulaService,
    public authService: AuthenticateService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser();
    this.userId = user ? user.id : null;

    this.aulaSubscription = this.aulaService.getAulaSubject().subscribe(() => {
      this.aulas = this.aulaService.aulas;
      this.aulasFiltradas = this.aulas; // Inicialmente, aulasFiltradas contém todas as aulas
    });

    this.authSubscription = this.authService.getUserStatus().subscribe(async (loggedIn) => {
      if (loggedIn) {
        await this.carregarAulas();
        const user = await this.authService.getUser();
        this.userId = user ? user.id : null;
      } else {
        this.userId = null;
        await this.carregarAulas(); // Certifique-se de recarregar aulas se não estiver logado
      }
    });

    await this.carregarAulas();
  }

  async carregarAulas() {
    await this.aulaService.getAulas();
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

  goToAulaDescricao(aulaId: string) {
    this.router.navigate(['/aula-descricao', aulaId], { queryParams: { origem: 'search' } }); // Navegação com o parâmetro de origem
  }

  isParticipating(aula: any): boolean {
    if (!aula.id_confirmados) {
      aula.id_confirmados = [];
    }
    return this.userId && aula.id_confirmados.includes(this.userId);
  }

  ngOnDestroy() {
    if (this.aulaSubscription) {
      this.aulaSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
