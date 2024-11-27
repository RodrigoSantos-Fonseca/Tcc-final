import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  constructor(
    private _authenticate: AuthenticateService,
  ) { }

  realizarLogin(dados: any){
    this._authenticate.login(dados.email, dados.password);
  }

  // entrarComGoogle(){
  //   this._authenticate.signInWithGoogle();
  // }



}
