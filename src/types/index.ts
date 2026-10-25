export interface Account {
  id: string
  bankName: string
  holderName: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
}

export type TransactionCategory =
  | 'income'
  | 'transfer'
  | 'food'
  | 'shopping'
  | 'bills'
  | 'airtime'
  | 'entertainment'
  | 'transport'

export interface Transaction {
  id: string
  title: string
  amount: number
  date: string
  category: TransactionCategory
  status: 'successful' | 'pending' | 'failed'
}
