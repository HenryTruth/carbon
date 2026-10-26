import type { Account, Transaction } from '@/types'

// Static data for the UI-only phase. Swap for API calls later.
export const MOCK_PASSCODE = '12345'

// Fresh 10-digit number on every load so no real account number is baked in.
function randomAccountNumber() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
}

export const account: Account = {
  id: 'acc_001',
  bankName: 'Carbon Bank',
  holderName: 'Henry Joshua',
  accountNumber: randomAccountNumber(),
  accountType: 'Savings',
  balance: 8350000,
  savingsBalance: 0,
  availableCredit: 240000,
  currency: 'NGN',
  status: 'Active',
  tier: 3,
  lastUpdated: new Date().toISOString(),
}

// Dates are relative to now so "Today" / "Yesterday" groups always look current.
function daysAgo(days: number, hour: number, minute = 0) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const transactions: Transaction[] = [
  { id: 'tx_01', title: 'Salary — Brightlane Ltd', amount: 650000, date: daysAgo(0, 9, 12), category: 'income', status: 'successful' },
  { id: 'tx_02', title: 'Chicken Republic', amount: -7850, date: daysAgo(0, 13, 40), category: 'food', status: 'successful' },
  { id: 'tx_03', title: 'Transfer to Ada Obi', amount: -45000, date: daysAgo(0, 16, 5), category: 'transfer', status: 'pending' },
  { id: 'tx_04', title: 'MTN Airtime', amount: -2000, date: daysAgo(1, 8, 30), category: 'airtime', status: 'successful' },
  { id: 'tx_05', title: 'Uber', amount: -4320, date: daysAgo(1, 19, 15), category: 'transport', status: 'successful' },
  { id: 'tx_06', title: 'Transfer from Chidi Eze', amount: 25000, date: daysAgo(2, 11, 0), category: 'transfer', status: 'successful' },
  { id: 'tx_07', title: 'IKEDC Electricity', amount: -15000, date: daysAgo(3, 10, 45), category: 'bills', status: 'successful' },
  { id: 'tx_08', title: 'Netflix', amount: -4400, date: daysAgo(3, 22, 0), category: 'entertainment', status: 'failed' },
  { id: 'tx_09', title: 'Jumia', amount: -38990, date: daysAgo(5, 14, 20), category: 'shopping', status: 'successful' },
  { id: 'tx_10', title: 'DSTV Subscription', amount: -12500, date: daysAgo(6, 9, 0), category: 'bills', status: 'successful' },
  { id: 'tx_11', title: 'Freelance — Webflow project', amount: 180000, date: daysAgo(8, 15, 30), category: 'income', status: 'successful' },
  { id: 'tx_12', title: 'Shoprite', amount: -22650, date: daysAgo(9, 18, 10), category: 'shopping', status: 'successful' },
]
