import { Injectable } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthPasswordResetService {
  private auth = getAuth(initializeApp(environment.firebaseConfig));

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent successfully.');
    } catch (error: any) {
      console.error('Error sending password reset email: ' + error.message);
      throw error;
    }
  }
}
