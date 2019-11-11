import { Injectable } from '@angular/core';
import { ExpenseInterface } from '../modal/expense';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  todayTotal: number;
  selectedDate: Date;
  expenses: ExpenseInterface[];
  expenseObservable: BehaviorSubject<ExpenseInterface[]>;
  todayTotalObservable: BehaviorSubject<number>;

  constructor() {
    this.expenses = [];
    this.selectedDate = new Date();
    this.expenseObservable = new BehaviorSubject(this.expenses);
    this.expenseObservable.asObservable();
    this.todayTotalObservable = new BehaviorSubject(this.todayTotal);
    this.todayTotalObservable.asObservable();

  }

  addExpense(expense: ExpenseInterface) {
    this.expenses.unshift(expense);
    this.addTotal(expense.amount);
    this.saveExpenseToStorage(expense.date).then(success => {
      this.expenseObservable.next(this.expenses);
    })
  }

  addTotal(val: number): void {
    this.todayTotal += val;
    this.todayTotalObservable.next(this.todayTotal);
  }

  async saveExpenseToStorage(date: Date) {

    console.log(date.toDateString());
    await Storage.set({ key: date.toDateString(), value: JSON.stringify(this.expenses) });
  }
  async getExpenseFromStorage() {

    await Storage.get({ key: this.getCurrentDate() }).then(value => {

      this.expenses = [];
      const objects: ExpenseInterface[] = JSON.parse(value.value);
      if (objects != null) {
        this.expenses = objects;
      } else {
        this.expenses = [];
      }
      this.expenseObservable.next(this.expenses);

    })
  }
  getCurrentDate() {
    return new Date().toDateString();
  }
  resetApp() {

  }
  getSpecificDate(date?: Date) {
    const newDate = (new Date(date || new Date()));
    return newDate;
  }

  initTodaysTotal() {
    let totalAmount: number = 0;
    this.expenses.forEach(element => {
      totalAmount += element.amount;
    });
    this.todayTotal = Math.round(totalAmount);
    this.todayTotalObservable.next(this.todayTotal);
  }

  async getSpecificExpences(date: Date) {

    await Storage.get({ key: date.toDateString() }).then(value => {

      this.expenses = [];
      const objects: ExpenseInterface[] = JSON.parse(value.value);
      if (objects != null) {
        this.expenses = objects;
      } else {
        this.expenses = [];
      }
      this.expenseObservable.next(this.expenses);

    })
  }


}
