import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sale } from '../models/Sale';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(public afs: AngularFirestore) { }

  createNewSale(userId: string, newSale: Sale){
    this.afs.collection('users').doc(userId).collection('sales').add(newSale).then(
      (e) => {
        console.log(e.id);
      }
    );
  }

  getSalesOfUser(userId: string){
    return this.afs.collection('users').doc(userId).collection<Sale>('sales').valueChanges();
  }

  getAllSales(){
    return this.afs.collectionGroup<Sale>('sales').valueChanges();
  }

  getAllSellers(){
    return this.afs.collection<User>('users').valueChanges();
  }
}
