import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AuthToken from '../models/auth/AuthToken';
import UserLoginInfo from '../models/auth/UserLoginInfo';
import UserRegistrationInfo from '../models/auth/UserRegistrationInfo';
import User from '../models/User';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';

import { AlertController } from '@ionic/angular';
import { StringFormat } from '@angular/fire/compat/storage/interfaces';

const authTokens: AuthToken[] = [];
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  private _storage: Storage | null = null;
  constructor(
    private router: Router,
    private storage: Storage,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private alertController: AlertController
  ) {
    this.afAuth.authState.subscribe((user) => {
      if(user){
        this.userData = user;
        this.router.navigate(['/dashboard']);
      } else {
        this.userData = null;
        this.router.navigate(['/home']);
      }
    });
  }

  getUserData(){
    if(!this.userData) {
       return this.router.navigate(['/home']);
      }
    console.log(this.userData.uid);
    return this.afs.firestore.collection('users').doc(this.userData.uid).get();
  }

  registerUser(data: UserRegistrationInfo){
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password).then(
      (response) => {
        const userData: User = {
          uid: response.user.uid,
          email: data.email,
          name: data.name,
        };
        this.setUserData(userData);
      }
    ).catch(
      (error) => {
        switch(error.code){
          case 'auth/email-already-in-use':{
            this.presentErrorAlert('Cette addresse email est utilisé par un autre utilisateur');
            break;
          }
          default: {
            this.presentErrorAlert(error.message);
            break;
         }
        }
      }
    );
  }

  login(data: UserLoginInfo) {
    return this.afAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            console.log(user);
            this.router.navigate(['/dashboard']);
          }
        });
      })
      .catch((error) => {
        this.presentErrorAlert(error.message);
      });
  }

  logout(){
   this.afAuth.signOut();
   this.router.navigate(['/home']);
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: user.name,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async presentErrorAlert(messageText) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: 'Une erreur s\'est produite',
      message: messageText,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentSuccessfulAlert(email: string, password: string) {
    const alert = await this.alertController.create({
      header: 'Bienvenu !',
      subHeader: 'Inscription complèté',
      message: 'Souhaitez-vous vous connecter?',
      buttons: [
        {
          text:'Oui',
          handler: () => {
          }
        }
        ,'Non']
    });

    await alert.present();
  }
}
