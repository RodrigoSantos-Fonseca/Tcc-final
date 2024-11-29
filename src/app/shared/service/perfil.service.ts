import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  user: any;

  constructor() { }

  setUser() {

  }

  getUser(){
    return this.user;
  }

}
