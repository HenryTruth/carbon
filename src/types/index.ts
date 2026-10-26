export interface Account {
  id: string
  bankName: string
  holderName: string
  accountNumber: string
  accountType: string
  balance: number
  savingsBalance: number
  availableCredit: number
  currency: string
  status: 'Active' | 'Restricted'
  tier: number
  lastUpdated: string
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
