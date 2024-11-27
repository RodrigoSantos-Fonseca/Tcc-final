import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage {
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  constructor(private alertController: AlertController) {}

  async alterarSenha() {
    if (this.novaSenha === this.confirmarSenha) {
      // Lógica para alterar a senha
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Sua senha foi alterada com sucesso!',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'As senhas não coincidem!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
