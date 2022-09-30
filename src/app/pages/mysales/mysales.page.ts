import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/models/Sale';
import { AuthService } from 'src/app/services/auth.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-mysales',
  templateUrl: './mysales.page.html',
  styleUrls: ['./mysales.page.scss'],
})
export class MysalesPage implements OnInit {

  sales!: Observable<Sale[]>;
  constructor(private saleService: SaleService, private authService: AuthService) { }

  ngOnInit() {
    const userId = this.authService.userData.uid;
    this.sales = this.saleService.getSalesOfUser(userId);

  }

}
