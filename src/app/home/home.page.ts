import { Component } from '@angular/core';
import { AddComponent } from '../components/add/add.component';
import { ModalController } from '@ionic/angular';
import { ExpenseInterface } from '../modal/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todayTotal: number;
  selectedDate: Date;
  expenses: ExpenseInterface[];
  todaysTotal: number;

  constructor(public modalController: ModalController, private expenseService: ExpenseService) {

    this.expenseService.expenseObservable.subscribe(expenses => {
      this.expenses = expenses
    });
    this.expenseService.todayTotalObservable.subscribe(value => {
      this.todayTotal = value;
    })

  }

  async presentAddComponent() {
    const modal = await this.modalController.create({
      component: AddComponent,
      componentProps: { date: this.expenseService.getSpecificDate(this.selectedDate) }
    });
    return await modal.present();
  }

  filterWithDate() {
    this.expenseService.getSpecificExpences(this.expenseService.getSpecificDate(this.selectedDate))
      .then(res => {
        this.expenseService.initTodaysTotal()
      })
  }

}
