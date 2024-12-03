import { Component, OnInit, OnDestroy } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search, home, add, person } from 'ionicons/icons';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { getFirestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthenticateService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private authSubscription: Subscription | null = null; // Inicialize com null

  constructor(private authService: AuthenticateService) {
    addIcons({ library, playCircle, radio, search, home, add, person });
  }

  ngOnInit() {
    this.authSubscription = this.authService.getUserStatus().subscribe(async (loggedIn) => {
      if (loggedIn) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, `users/${user.uid}`));
          const userData = userDoc.data();
          if (userData) {
            this.isAdmin = userData['admin'] === true;
          }
        }
      } else {
        this.isAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
