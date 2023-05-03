import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AvatarService } from '../services/avatar.service';
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

  profile = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {

    this.avatarService.getUserProfile().subscribe((data) => {
			this.profile = data;
		});
  }

  async logout() {
    // this.authService.logout();
    const loading = await this.loadingController.create();
		await loading.present();
    signOut(this.auth);
    await loading.dismiss();
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  async changeImage() {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64,
			source: CameraSource.Photos // Camera, Photos or Prompt!
		});

		if (image) {
			const loading = await this.loadingController.create();
			await loading.present();

			const result = await this.avatarService.uploadImage(image);
			loading.dismiss();

			if (!result) {
				const alert = await this.alertController.create({
					header: 'Upload failed',
					message: 'There was a problem uploading your avatar.',
					buttons: ['OK']
				});
				await alert.present();
			}
		}
	}

}
