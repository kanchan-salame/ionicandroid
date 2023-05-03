import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private auth: Auth, private router: Router,) {}

	async register({ email, password } : { email:string, password:string}) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	async login({ email, password } : { email:string, password:string}) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		 signOut(this.auth);
     this.router.navigateByUrl('', { replaceUrl: true });
	}
}
