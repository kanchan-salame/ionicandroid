import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name:any;
  email:any;
  password:any;

  constructor(
    private navCtrl: NavController,
    private auth: Auth,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  gotoSignIn() {
    this.navCtrl.navigateForward('login')
  }

  async SignUp() {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      // this.storage.set('user', user);
      return user;
    } catch (e) {
      return null;
    }
  }

}
