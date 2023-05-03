import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {
	Auth,
	signOut
} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private loadingController: LoadingController,
  ) {}

  async logout() {
    // this.authService.logout();
    const loading = await this.loadingController.create();
		await loading.present();
    signOut(this.auth);
    await loading.dismiss();
    this.router.navigateByUrl('', { replaceUrl: true });
  }

}
