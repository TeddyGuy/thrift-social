import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AuthToken from '../models/auth/AuthToken';
import UserLoginInfo from '../models/auth/UserLoginInfo';
import UserRegistrationInfo from '../models/auth/UserRegistrationInfo';
import User from '../models/User';

const users: User[] = [];
const authTokens: AuthToken[] = [];
let localAuthToken = '';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private router: Router) { }

  //TODO get users from remote backend
  getUsers(){
    return users;
  }

  getUser(){
    const userId = authTokens.find((authToken) => (authToken.token === localAuthToken)).id;
    return users.find((user) => (user.id === userId));
  }

  registerUser(data: UserRegistrationInfo){
    //TODO send data to backend remote to handle this verification
    if(users.find((user) => (user.email === data.email))){
      console.error('email-taken');
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      password: data.password
    };

    //TODO register users on remote backend
    users.push(newUser);
    this.router.navigate(['/home']);
  }

  login(data: UserLoginInfo) {
    //TODO get user from remote backend
    if(authTokens.find((authToken) => (authToken.token === localAuthToken))){
      console.error('already-logged-in');
      return;
    }

    const userFromServer = users.find((user) => (user.email === data.email));
    if(!userFromServer){
      console.error('incorrect-credentials');
      return;
    }

    if(userFromServer.password !== data.password){
      console.error('incorrect-credentials');
      return;
    }

    //TODO generate authToken on remote backend
    localAuthToken = 'auth-' + authTokens.length + 1;
    const newAuthToken: AuthToken = {
      id: authTokens.length + 1,
      token: localAuthToken,
      userId: userFromServer.id
    };

    authTokens.push(newAuthToken);
    this.router.navigate(['/dashboard']);
  }

  logout(){
    //TODO handle this on remote backend
    const index = authTokens.findIndex((authToken) => (authToken.token === localAuthToken));

    if(index !== -1){
      authTokens.splice(index,1);
    }

    this.router.navigate(['/home']);
  }
}
