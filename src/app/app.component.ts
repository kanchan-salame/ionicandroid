import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {
	Auth,
	signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'About', url: '/about', icon: 'people' },
    { title: 'Contact', url: '/contact', icon: 'call' },
    { title: 'Gallery', url: '/gallery', icon: 'images' },
    { title: 'Setting', url: '/setting', icon: 'settings' }
  ];
  navigate: any;
  constructor(
    private auth: Auth,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  async logout() {
    // this.authService.logout();
    const loading = await this.loadingController.create();
		await loading.present();
    signOut(this.auth);
    await loading.dismiss();
    this.router.navigateByUrl('', { replaceUrl: true });
  }
}
