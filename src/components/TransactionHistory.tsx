import React, { useState } from "react";
import { Transaction } from "../types";
import { Eye, EyeOff, Filter, PlusCircle, MinusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<Props> = ({ transactions }) => {
  const [filter, setFilter] = useState<"all" | "topup" | "withdraw">("all");
  const [show, setShow] = useState(true);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  return (
    <div className="mt-6 p-4 border rounded-xl shadow bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Riwayat Transaksi
        </h3>
        <button
          onClick={() => setShow((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {show ? "Sembunyikan" : "Tampilkan"}
        </button>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="text-sm mr-2">Filter:</label>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | "topup" | "withdraw")
                }
              >
                <option value="all">Semua</option>
                <option value="topup">Top Up</option>
                <option value="withdraw">Tarik</option>
              </select>
            </div>

            {filteredTransactions.length === 0 ? (
              <p className="text-gray-500">Tidak ada transaksi</p>
            ) : (
              <ul className="space-y-2">
                {filteredTransactions.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between border-b pb-1 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {tx.type === "topup" ? (
                        <PlusCircle className="text-green-600 w-4 h-4" />
                      ) : (
                        <MinusCircle className="text-red-600 w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {tx.type === "topup" ? "Top Up" : "Tarik"}
                      </span>
                    </div>
                    <div className="text-right text-gray-600">
                      <div>Rp {tx.amount.toLocaleString("id-ID")}</div>
                      <div className="text-xs">
                        {new Date(tx.date).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionHistory;
