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

import { AlertController } from '@ionic/angular';

const authTokens: AuthToken[] = [];
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  constructor(
    private router: Router,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private alertController: AlertController
  ) {
    this.afAuth.authState.subscribe((user) => {
      if(user){
        this.userData = user;
      } else {
        this.userData = 'no user';
      }
    });
  }

  getUserData(){
    return this.userData;
  }

  registerUser(data: UserRegistrationInfo){
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password).then(
      (response) => {
        console.log(response);
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
        console.log(result);
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout(){
    //TODO handle this on remote backend
    // const index = authTokens.findIndex((authToken) => (authToken.token === localAuthToken));

    // if(index !== -1){
    //   authTokens.splice(index,1);
    // }

    // this.router.navigate(['/home']);
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
