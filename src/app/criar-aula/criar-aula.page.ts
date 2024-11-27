import { Component, OnInit } from '@angular/core';
import { AulaService } from '../shared/service/aula.service';
import { CrudService } from '../services/crud.service';



@Component({
  selector: 'app-criar-aula',
  templateUrl: './criar-aula.page.html',
  styleUrls: ['./criar-aula.page.scss'],
})
export class CriarAulaPage implements OnInit {

  constructor(
    public crudService: CrudService,
    public aulaService: AulaService
  ) {
  }


  ngOnInit() {
  }


}
