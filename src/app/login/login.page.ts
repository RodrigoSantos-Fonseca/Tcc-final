import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticateService, private router: Router) { }

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
      console.log('Tentando fazer login com:', email);
      const success = await this.authService.login(email, password);
      if (success) {
        console.log('Login bem-sucedido!');
        this.router.navigate(['/home']);
      } else {
        console.log('Falha ao fazer login.');
      }
    } else {
      console.log('Formulário inválido:', form);
    }
  }
}
