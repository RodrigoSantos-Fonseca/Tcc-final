import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any;

  constructor(private authService: AuthenticateService) { }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    console.log('Dados do usuário na página de perfil:', this.user);
  }

  logout() {
    this.authService.logout();
  }
}
