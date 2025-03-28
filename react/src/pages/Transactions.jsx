
import React from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Transactions = () => {
  const transactions = [
    { id: 1, type: 'deposit', amount: 25.00, description: 'Tournament Deposit', date: '2024-03-15', status: 'completed' },
    { id: 2, type: 'withdrawal', amount: 15.00, description: 'Prize Withdrawal', date: '2024-02-28', status: 'completed' },
    { id: 3, type: 'deposit', amount: 10.00, description: 'Group Membership Fee', date: '2024-02-10', status: 'completed' },
    { id: 4, type: 'deposit', amount: 20.00, description: 'Tournament Entry Fee', date: '2024-01-20', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-silver-500">Track your deposits and withdrawals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-silver-500">Current Balance</p>
                <p className="text-2xl font-bold">$40.00</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-silver-500">Description</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-silver-500">Amount</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-silver-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-silver-50">
                      <td className="px-4 py-3 text-left">{transaction.date}</td>
                      <td className="px-4 py-3 text-left">
                        <div className="flex items-center">
                          {transaction.type === 'deposit' ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-amber-500 mr-2" />
                          )}
                          <span>{transaction.description}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        <span className={transaction.type === 'deposit' ? 'text-green-600' : 'text-amber-600'}>
                          {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'outline'}>
                          {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <p className="text-silver-500 text-sm">
                Note: This is a placeholder page. Transaction functionality will be implemented in a future update.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
