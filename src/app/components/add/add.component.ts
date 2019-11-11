import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Expense } from '../../modal/expense';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  @Input('date') date: Date;
  constructor(private modalController: ModalController, public toastController: ToastController, private expenseService: ExpenseService) { }

  ngOnInit() { }
  dismissModal() {
    this.modalController.dismiss();
  }

  expenseTypes: any[] = [
    { name: 'General', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Food', description: 'Daily Food Stuff', type: 'foot', icon: 'add-circle' },
    { name: 'Dining Out', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Groceries', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Movies', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Clothing', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Other', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Games', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Sports', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Electronics', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Furniture', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Maintenance', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Mortgage', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Pets', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Rent', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Services', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Gifts', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Insurance', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Medical', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Taxes', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Cleaning', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Electricity', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Gas', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Internet', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
    { name: 'Mobile', description: 'Daily Food Stuff', type: 'meat', icon: 'add-circle' },
  ];
  logExpenseInput(amount: HTMLInputElement, description: HTMLInputElement, type: HTMLInputElement) {

    if (parseInt(amount.value) < 0 || amount.value === "") {
      this.presentToast();
      return;
    }
    const expense = new Expense(Number(amount.value), type.value,
      description.value, this.date);
    this.expenseService.addExpense(expense);
    this.dismissModal();

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Enter Coorect Amount.',
      duration: 1000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
