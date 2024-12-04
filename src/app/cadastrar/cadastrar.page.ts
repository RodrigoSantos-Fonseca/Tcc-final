import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticateService } from '../services/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  public user: any = {
    id: null,
    nome: null,
    data_nascimento: null,
    sexo: null,
    email: null,
    admin: false // Adicione este campo para inicializar o admin como falso
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private _authenticate: AuthenticateService,
    public firestore: Firestore
  ) { }

  submitForm() {
    console.log('submit!');
  }

  async criarConta(dados: any) {
    const userCredential: UserCredential | null = await this._authenticate.register(dados.email, dados.password);
    if (userCredential) {
      console.log('Usuário registrado com UID:', userCredential.user.uid);
      // Verifique se a senha é "personalgk" e defina admin como true
      const userData = {
        id: userCredential.user.uid,
        nome: dados.nome,
        data_nascimento: dados.data_nascimento,
        sexo: dados.sexo,
        email: dados.email,
        admin: dados.password === 'personalgk' // Define admin como true se a senha for "personalgk"
      };
      await this.salvarDadosUsuario(userData, userCredential.user.uid);
    }
  }

  async salvarDadosUsuario(dados: any, userId: string) {
    try {
      const userRef = doc(this.firestore, `users/${userId}`);
      await setDoc(userRef, dados);
      console.log('Dados do usuário salvos com sucesso!');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário: ', error);
      await this.showToast('Erro ao salvar dados do usuário!', 'middle');
    }
  }

  async showToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position
    });
    await toast.present();
  }

  async onSubmit(form: NgForm) {
    form.resetForm();
    console.log('Formulário enviado com sucesso!');
  }

  ngOnInit() {
  }
}
