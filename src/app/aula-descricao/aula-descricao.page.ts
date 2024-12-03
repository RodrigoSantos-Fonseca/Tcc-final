import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AulaService } from '../shared/service/aula.service';
import { AuthenticateService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aula-descricao',
  templateUrl: './aula-descricao.page.html',
  styleUrls: ['./aula-descricao.page.scss'],
})
export class AulaDescricaoPage implements OnInit {
  aula: any = null;
  userId: string | null = null;
  isAdmin: boolean = false;
  showEditModal: boolean = false;
  origem: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aulaService: AulaService,
    private authService: AuthenticateService
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser();
    this.userId = user ? user.id : null;
    this.isAdmin = user ? user.admin : false;
    this.origem = this.route.snapshot.queryParamMap.get('origem');

    this.route.paramMap.subscribe(params => {
      const aulaId = params.get('id');
      if (aulaId) {
        this.aulaService.getAulas().then(() => {
          this.aula = this.aulaService.aulas.find((a: any) => a.id === aulaId);
        });
      }
    });
  }

  async confirmarPresenca() {
    await this.aulaService.confirmarPresenca(this.aula);
    // Atualize a aula após confirmar a presença para refletir mudanças no botão
    this.aulaService.getAulas().then(() => {
      const aulaId = this.route.snapshot.paramMap.get('id');
      this.aula = this.aulaService.aulas.find((a: any) => a.id === aulaId);
    });
  }

  abrirModal() {
    this.showEditModal = true;
  }

  fecharModal() {
    this.showEditModal = false;
  }

  async salvarEdicao(form: NgForm) {
    await this.aulaService.updateAula(this.aula.id, form.value);
    this.fecharModal();
  }

  async apagarAula() {
    await this.aulaService.apagarAula(this.aula.id);
    this.fecharModal();
  }

  voltar() {
    if (this.origem === 'home') {
      this.router.navigate(['/home']);
    } else if (this.origem === 'search') {
      this.router.navigate(['/search']);
    }
  }

  getButtonStyle() {
    if (this.aula.confirmados >= this.aula.qtd && !this.aula.id_confirmados.includes(this.userId)) {
      return { 'background-color': '#FFC107', 'color': 'black' }; // Amarelo (Indisponível)
    } else if (this.aula.id_confirmados.includes(this.userId)) {
      return { 'background-color': '#FF0000', 'color': 'black' }; // Vermelho (Cancelar)
    } else {
      return { 'background-color': '#4E905C', 'color': 'black' }; // Verde (Participar)
    }
  }

  getButtonLabel() {
    if (this.aula.confirmados >= this.aula.qtd && !this.aula.id_confirmados.includes(this.userId)) {
      return 'Indisponível';
    } else if (this.aula.id_confirmados.includes(this.userId)) {
      return 'Cancelar';
    } else {
      return 'Participar';
    }
  }

  isButtonDisabled() {
    return this.aula.confirmados >= this.aula.qtd && !this.aula.id_confirmados.includes(this.userId);
  }
}
