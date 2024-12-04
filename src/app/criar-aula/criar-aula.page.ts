import { Component, OnInit } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../services/auth.service';

@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.page.html',
  styleUrls: ['./criar-aula.page.scss'],
})
export class CriarAulaPage implements OnInit {

  constructor(
    public crudService: CrudService,
    public aulaService: AulaService,
    public router: Router,
    private authService: AuthenticateService // Adiciona o serviço de autenticação
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser();
    if (!user || !user.admin) {
      this.returnHome(); // Redireciona para a página inicial se o usuário não for admin
    }
  }

  async salvarAula(form: NgForm) {
    await this.aulaService.salvar(form);
    this.returnHome();
  }

  returnHome() {
    this.router.navigate(['/home']);
  }
}
