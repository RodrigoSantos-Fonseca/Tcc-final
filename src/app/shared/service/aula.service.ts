import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { NgForm } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class AulaService {

  aula: any ={ 
    id: null, 
    nome: null, 
    hora_inicio: null, 
    hora_fim: null, 
    data: null, 
    professor: null, 
    sala: null, 
    qtd: null,
    descricao: null,
    aluno: [
    ] 
  }

aulas:any =[];


salvar(form:NgForm) {
  this.crudService.insert(this.aula, 'aulas');
  form.resetForm(); 
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
             aluno:[]
}

}


getAulas(){
  this.crudService.fetchAll('aulas')
  .then(resp => {
    this.aulas = resp;
  })
}

confirmarPresenca() { 
  
}


  constructor(
    public crudService: CrudService,
  ) { 
    this.getAulas();
  }
}
