import React, { useEffect, useState } from "react";
import axios from "axios";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionHistory from "./components/TransactionHistory";
import { Transaction } from "./types";

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWalletData = async () => {
    try {
      const [balanceRes, txRes] = await Promise.all([
        axios.get("https://top-up-express.vercel.app/api/wallet/balance"),
        axios.get("https://top-up-express.vercel.app/api/wallet/transactions"),
      ]);
      setBalance(balanceRes.data.balance);
      setTransactions(txRes.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const handleTransaction = async (
    type: "topup" | "withdraw",
    amount: number
  ) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://top-up-express.vercel.app/api/wallet/transaction",
        { type, amount }
      );

      if (res.data.success) {
        setBalance(res.data.balance);
        setTransactions((prev) => [res.data.transaction, ...prev]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Terjadi kesalahan.");
      } else {
        alert("Terjadi kesalahan tidak terduga.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Dompet Digital</h1>
        <Balance balance={balance} />
        <TransactionForm onSubmit={handleTransaction} loading={loading} />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default App;
