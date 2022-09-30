import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSalePage } from './search-sale.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSalePageRoutingModule {}
