import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticateService } from '../services/auth.service';
import { AulaService } from '../shared/service/aula.service';
import { CrudService } from '../services/crud.service';
import { Firestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  
  public user: any ={};


  constructor(
    private router: Router,
    private toastController: ToastController,
    private _authenticate: AuthenticateService,
    public aulaService: AulaService,
    public crudService: CrudService,
    public firestore: Firestore

  ) { }





submitForm(){
  console.log('submit!');
}


  criarConta(dados:any){
   this._authenticate.register(dados.email, dados.password);
  }

   async onSubmit(form: NgForm) {
    form.resetForm();
     // Aqui você pode adicionar a lógica para enviar os dados para um serviço ou API
    
    console.log('Formulário enviado com sucesso!');
    
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000,
      position: 'middle'
    });
     
    await toast.present();


    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}