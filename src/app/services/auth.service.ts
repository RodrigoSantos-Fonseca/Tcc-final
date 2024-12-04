import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  duration: number = 2000;
  message: string = 'Erro inesperado';
  isLoading = false;
  private user: any = null;
  private userStatusSubject = new BehaviorSubject<boolean>(false);

  constructor(
    public auth: Auth,
    private firestore: Firestore,
    private _message: MessageService,
    private _router: Router,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('Usuário autenticado:', user);
        await this.getUserData(user.uid);
        localStorage.setItem('userId', user.uid);
        this.userStatusSubject.next(true);
      } else {
        console.log('Nenhum usuário autenticado');
        this.user = null;
        localStorage.removeItem('userId');
        this.userStatusSubject.next(false);
      }
    });
  }

  getUserStatus() {
    return this.userStatusSubject.asObservable();
  }

  private async getUserData(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      this.user = userSnap.data();
      this.user.id = uid;
      console.log('Dados do usuário:', this.user);
    } else {
      console.error('Documento do usuário não encontrado');
    }
  }

  async getUser() {
    if (!this.user) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await this.getUserData(userId);
      }
    }
    return this.user;
  }

  checkLogin() {
    return this.user !== null;
  }

  public async register(email: string, password: string): Promise<UserCredential | null> {
    this.isLoading = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this._message.show('Conta criada com sucesso! Realize o Login!!!');
      this.redirectTo('/login');
      return userCredential;
    } catch (error) {
      this.showErro(error, email, password);
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  public async login(email: string, password: string): Promise<boolean> {
    this.isLoading = true;
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this._message.show('Login Realizado com Sucesso!');
      localStorage.setItem('userId', userCredential.user.uid);
      this.userStatusSubject.next(true);
      this.redirectTo('/home');
      return true;
    } catch (error) {
      this.showErro(error, email, password);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('userId');
      this.userStatusSubject.next(false);
      this._router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao sair: ', error);
    }
  }

  redirectTo(page: string) {
    this._router.navigate([page]);
  }

  showErro(error: any, email: string, password: string) {
    if (error.code === 'auth/too-many-requests') this.message = 'Você realizou muitas tentativas de login. Tente novamente mais tarde.';
    if (error.code === 'auth/user-not-found') this.message = 'Usuário não encontrado.';
    if (error.code === 'auth/wrong-password') this.message = 'Senha incorreta.';
    if (error.code === 'auth/weak-password') this.message = 'A senha deve conter no mínimo 6 caracteres.';
    if (error.code === 'auth/email-already-in-use') this.message = 'Este e-mail já está em uso.';
    if (error.code === 'auth/missing-email') this.message = 'E-mail não informado.';
    if (!email) this.message = 'Preencha o e-mail.';
    if (!password) this.message = 'Preencha a senha com 6 caracteres.';
    this._message.show(this.message, this.duration);
  }
}
