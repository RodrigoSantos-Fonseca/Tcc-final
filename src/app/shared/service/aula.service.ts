import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private aulaSubject = new BehaviorSubject<void>(undefined);

  aula: any = {
    id: null,
    nome: null,
    hora_inicio: null,
    hora_fim: null,
    data: null,
    professor: null,
    sala: null,
    qtd: null,
    descricao: null,
    confirmados: 0,
    aluno: [],
    id_confirmados: []
  };

  aulas: any = [];

  constructor(
    public crudService: CrudService,
    private authService: AuthenticateService
  ) {
    this.getAulas();
  }

  salvar(form: NgForm) {
    this.crudService.insert(this.aula, 'aulas').then(() => {
      this.aulaSubject.next();
      form.resetForm();
      this.resetAula();
    });
  }

  async getAulas() {
    const resp = await this.crudService.fetchAll('aulas');
    this.aulas = resp;
    this.aulas.forEach((aula: any) => {
      if (!aula.id_confirmados) {
        aula.id_confirmados = [];
      }
    });
    this.aulas.sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime());
    this.aulaSubject.next();
  }

  async confirmarPresenca(aula: any) {
    if (!this.authService.checkLogin()) {
      this.authService.redirectTo('/login');
      return;
    }
    const user = await this.authService.getUser();
    const userId = user.id;
    if (userId) {
      if (!aula.id_confirmados) {
        aula.id_confirmados = [];
      }
      const isParticipating = aula.id_confirmados.includes(userId);
      if (isParticipating) {
        aula.confirmados -= 1;
        aula.id_confirmados = aula.id_confirmados.filter((id: string) => id !== userId);
      } else if (aula.confirmados < aula.qtd) {
        aula.confirmados += 1;
        aula.id_confirmados.push(userId);
      }
      await this.crudService.update(aula.id, aula, 'aulas');
      this.aulaSubject.next();
    }
  }

  async updateAula(id: string, data: any) {
    await this.crudService.update(id, data, 'aulas');
    this.aulaSubject.next();
  }

  async apagarAula(id: string) {
    await this.crudService.delete(id, 'aulas');
    this.aulaSubject.next();
  }

  getAulaSubject() {
    return this.aulaSubject.asObservable();
  }

  private resetAula() {
    this.aula = {
      id: null,
      nome: null,
      hora_inicio: null,
      hora_fim: null,
      data: null,
      professor: null,
      sala: null,
      qtd: null,
      descricao: null,
      confirmados: 0,
      aluno: [],
      id_confirmados: []
    };
  }
}
