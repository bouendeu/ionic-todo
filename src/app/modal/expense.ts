export interface ExpenseInterface {
    id: string;
    amount: number;
    type: string;
    description: string;
    date: Date;
}

export class Expense implements ExpenseInterface {
    id: string; amount: number;
    type: string;
    description: string;
    date: Date;

    constructor(amount: number, type: string, description: string, date: Date) {

        this.id = null;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.date = date;
    }

    createUuid() {
        return Math.random().toString(36).substring(2, 15)
            + Math.random().toString(36).substring(2, 15);
    }
}
