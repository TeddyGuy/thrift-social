import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import FormControlBase from 'src/app/models/form/FormControlBase';
import newSaleForm from 'src/app/models/form/NewArticleSaleForm';
import { Sale } from 'src/app/models/Sale';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

  form!: FormGroup;
  payload: Sale;
  formData: FormControlBase[] = newSaleForm;

  constructor(private saleService: SaleService, private formService: FormService, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formService.toFormGroup(this.formData);
  }

  onSubmit() {
    const userId = this.authService.userData.uid;
    this.payload = this.form.getRawValue();
    this.authService.getUserData().then((userData) => {
      const user = userData.data();
      this.payload.seller = user.name;
      this.saleService.createNewSale(userId, this.payload);
    }
   );
    this.form.reset();
  }

}
