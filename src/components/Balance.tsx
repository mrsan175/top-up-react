interface BalanceProps {
  balance: number;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => (
  <div className="mb-6 text-xl font-semibold">
    <h2>
      Saldo:{" "}
      <span className="text-green-600">
        Rp {balance.toLocaleString("id-ID")}
      </span>
    </h2>
  </div>
);

export default Balance;
