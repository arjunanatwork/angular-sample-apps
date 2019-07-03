import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export class User {
  uid: string;
  email: string;
  password?: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Email Sign Up
  emailSignUp(credentials: User) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(authState => {
        console.log('Email Sign Up');
        this.updateUserData(authState.user);
        this.toastr.success(
          'Sign-up successful. Please login with your crendentials',
          '',
          {
            timeOut: 4000,
            toastClass: 'ngx-toastr has-background-success'
          }
        );
        this.router.navigate(['/signin']);
      })
      .catch(error => {
        this.toastr.error(error.message, '', {
          timeOut: 4000,
          toastClass: 'ngx-toastr has-background-danger'
        });
      });
  }

  // Email Sign In
  emailSignIn(credentials: User) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(authState => {
        console.log('Email Login Success');
        this.router.navigate(['/trello-clone']);
      })
      .catch(error => {
        this.toastr.error(error.message, '', {
          timeOut: 4000,
          toastClass: 'ngx-toastr has-background-danger'
        });
      });
  }

  // Google Login
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Github Login
  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Twitter Login
  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
      this.router.navigate(['/trello-clone']);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/signin']);
    });
  }
}
