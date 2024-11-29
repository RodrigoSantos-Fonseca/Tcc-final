import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Auth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from '@angular/fire/auth';
import { AuthenticateService } from '../services/auth.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage {
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  constructor(
    private alertController: AlertController,
    private authService: AuthenticateService,
    private auth: Auth
  ) {}

  async alterarSenha() {
    if (this.novaSenha !== this.confirmarSenha) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'As senhas não coincidem!',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const user = this.auth.currentUser;
    if (user && this.senhaAtual) {
      const credential = EmailAuthProvider.credential(user.email!, this.senhaAtual);
      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.novaSenha);
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Sua senha foi alterada com sucesso!',
          buttons: ['OK']
        });
        await alert.present();
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Erro ao alterar a senha. Verifique sua senha atual e tente novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha a senha atual.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
