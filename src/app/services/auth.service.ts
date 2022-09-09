import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import UserRegistrationInfo from '../models/auth/UserRegistrationInfo';
import User from '../models/User';

const users: User[] = [];
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private router: Router) { }

  //TODO get users from remote backend
  getUsers(){
    return users;
  }

  registerUser(data: UserRegistrationInfo){
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
}
