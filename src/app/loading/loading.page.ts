import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private router: Router, private loadingController: LoadingController) {}

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 3000 // Tempo de carregamento em milissegundos
    });
    await loading.present();
    
    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/login');
}
}
