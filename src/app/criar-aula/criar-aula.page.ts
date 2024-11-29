import { Component, OnInit } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.page.html',
  styleUrls: ['./criar-aula.page.scss'],
})
export class CriarAulaPage implements OnInit {

  constructor(
    public crudService: CrudService,
    public aulaService: AulaService,
    public router: Router
  ) {}

  ngOnInit() {}

  async salvarAula(form: NgForm) {
    await this.aulaService.salvar(form);
    this.returnHome();
  }

  returnHome() {
    this.router.navigate(['/home']);
  }
}
