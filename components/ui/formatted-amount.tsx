import React from "react";
import { formatCurrency } from "@/lib/formatCurrency";

type FormattedAmountProps = {
  amount: number;
  currency?: string;
  decimals?: number;
  className?: string;
};

const FormattedAmount: React.FC<FormattedAmountProps> = ({
  amount,
  currency = "৳",
  decimals = 2,
  className = "",
}) => {
  return <span className={className}>{formatCurrency(amount, currency, decimals)}</span>;
};

export default FormattedAmount;
