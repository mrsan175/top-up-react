export interface Transaction {
    id: string;
    type: 'topup' | 'withdraw';
    amount: number;
    date: string;
  }
  