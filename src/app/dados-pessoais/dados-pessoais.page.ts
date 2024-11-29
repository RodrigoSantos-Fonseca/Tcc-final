import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthenticateService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage implements OnInit {

  nome: string = '';
  dataNascimento: string = '';
  email: string = '';
  sexo: string = '';
  telefone: string = '';
  originalSexo: string = '';
  originalTelefone: string = '';

  constructor(
    private router: Router,
    private firestore: Firestore,
    private authService: AuthenticateService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      await this.loadUserData(userId);
    } else {
      console.log('Usuário não autenticado');
    }
  }

  async loadUserData(userId: string) {
    try {
      const userDoc = doc(this.firestore, `users/${userId}`);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        this.nome = userData['nome'];
        this.dataNascimento = userData['data_nascimento'];
        this.email = userData['email'];
        this.sexo = userData['sexo'];
        this.telefone = userData['telefone'] || '';
        this.originalSexo = this.sexo;
        this.originalTelefone = this.telefone;
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário: ', error);
    }
  }

  async salvarAlteracoes() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const updates: any = {};
    if (this.sexo !== this.originalSexo) {
      updates.sexo = this.sexo;
    }
    if (this.telefone && this.telefone !== this.originalTelefone) {
      updates.telefone = this.telefone;
    }

    if (Object.keys(updates).length > 0) {
      try {
        const userRef = doc(this.firestore, `users/${userId}`);
        await setDoc(userRef, updates, { merge: true });
        console.log('Dados atualizados com sucesso!');
        await this.showToast('Dados atualizados com sucesso!', 'middle');
      } catch (error) {
        console.error('Erro ao atualizar os dados: ', error);
        await this.showToast('Erro ao atualizar os dados!', 'middle');
      }
    } else {
      console.log('Nenhuma alteração para salvar.');
    }
  }

  async showToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position
    });
    await toast.present();
    this.router.navigate(['/perfil']);
  }

}
