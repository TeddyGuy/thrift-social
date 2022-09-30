import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: any = {
    name: 'no user'
  };
  constructor(
    private authService: AuthService,
    private router: Router
    ) {

    }

  ngOnInit() {
   this.authService.getUserData().then((userData) => {
      if(!userData.data) { return this.router.navigate(['/home']); };
      this.user = userData.data();
    }
   );
  }

  logout(){
    this.authService.logout();
  }

  goToSell(){
    this.router.navigate(['/sell']);
  }

  goToMySales(){
    this.router.navigate(['/mysales']);
  }

  goToSearchSale(){
    this.router.navigate(['/search-sale']);
  }
}
