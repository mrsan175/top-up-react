import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSubmit: (type: "topup" | "withdraw", amount: number) => void;
  loading: boolean;
}

const TransactionForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"topup" | "withdraw">("topup");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;
    onSubmit(type, numericAmount);
    setAmount("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-8 flex flex-col md:flex-row items-center gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "topup" | "withdraw")}
        className="border px-4 py-2 rounded-md"
      >
        <option value="topup">Top Up</option>
        <option value="withdraw">Tarik Dana</option>
      </select>

      <input
        type="number"
        placeholder="Jumlah"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-4 py-2 rounded-md"
      />

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {loading ? "Memproses..." : "Submit"}
      </button>
    </motion.form>
  );
};

export default TransactionForm;
