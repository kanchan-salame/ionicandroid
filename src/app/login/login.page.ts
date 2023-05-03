import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
// import { AlertController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
// impor * as firebase from 'firebase';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
// import { Storage } from '@ionic/storage-angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {


  credentials: FormGroup | any;
  header:string;
  message:string;
  // credentials: any;
  // auth:any;
	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
    // private credentials: FormGroup,
    private navCtrl: NavController,
    private auth: Auth,
    // private storage: Storage,
    // private navCtrl

	) {}

  // Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}



	ngOnInit() {
    this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

  async register() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.register(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
      // this.showAlert('Registration failed', 'Please try again!');
      alert('hi')

		}
	}

  async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
    console.log(user);

		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('/home', { replaceUrl: true });
      // this.navCtrl.navigateRoot('home');
		} else {
			// console.log('something went wrong');
      // this.showAlert('Login failed', 'Please try again!');
      alert('hi')
		}
	}

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }

  // async SignUp(this.email, this.password) {
  //     	try {
  //     		const user = await signInWithEmailAndPassword(this.auth, this.email, this.password);
  //     		return user;
  //     	} catch (e) {
  //     		return null;
  //     	}
  // }

  // SignIn() {
  //     	try {
  //     		const user = signInWithEmailAndPassword(this.auth, this.email, this.password);
  //         console.log(user)
  //         this.storage.set('user', this.auth);

  //         // this.router.navigate(['/home']);
  //         this.navCtrl.navigateRoot('home');
  //         // return user;
  //     	} catch (e) {
  //     		// return null;
  //     	}
  //   }

  async showAlert(header , message) {
		// const alert = await this.alertController.create({
		// 	header,
		// 	message,
		// 	buttons: ['OK']
		// });
		// await alert.present();
	}

}
