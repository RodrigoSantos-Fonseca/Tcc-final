import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/auth.service';
import { AuthPasswordResetService } from 'src/app/shared/service/auth-password-reset.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen = false;
  resetEmail = '';

  constructor(
    private authService: AuthenticateService,
    private authPasswordResetService: AuthPasswordResetService,
    private router: Router,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    const user = await this.authService.getUser();
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  async realizarLogin(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.messageService.show('Tentando fazer login com: ' + email);
      const success = await this.authService.login(email, password);
      if (success) {
        this.messageService.show('Login bem-sucedido!');
        this.router.navigate(['/home']);
      } else {
        this.messageService.show('Falha ao fazer login.');
      }
    } else {
      this.messageService.show('Formulário inválido.');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async resetPassword() {
    if (this.isValidEmail(this.resetEmail)) {
      try {
        await this.authPasswordResetService.sendPasswordResetEmail(this.resetEmail);
        this.messageService.show('Password reset email sent successfully.');
      } catch (error: any) {
        this.messageService.show('Error sending password reset email: ' + error.message);
      }
    } else {
      this.messageService.show('Invalid email address.');
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }
}
