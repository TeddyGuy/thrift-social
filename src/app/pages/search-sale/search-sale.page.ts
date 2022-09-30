import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/models/Sale';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.page.html',
  styleUrls: ['./search-sale.page.scss'],
})
export class SearchSalePage implements OnInit {

  user: User;
  query: string;
  salesResults: Observable<Sale[]>;
  sellersResults: Observable<User[]>;
  constructor(private saleService: SaleService, private authService: AuthService, ) { }

  ngOnInit() {
    this.authService.getUserData().then((userData) => {
      this.user = userData.data();
    }
   );
  }

  onChange(event){
    this.query = event.target.value;
    this.salesResults = this.saleService.getAllSales();
    this.sellersResults = this.saleService.getAllSellers();
  }
}
