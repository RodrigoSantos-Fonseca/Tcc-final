import { Component, OnInit, OnDestroy } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { AuthenticateService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  aulas: any[] = [];
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
  }

  goToAulaDescricao(aulaId: string) {
    this.router.navigate(['/aula-descricao', aulaId], { queryParams: { origem: 'home' } }); // Navegação com o parâmetro de origem
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
