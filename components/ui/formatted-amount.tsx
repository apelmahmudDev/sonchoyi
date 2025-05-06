import React from "react";
import { formatCurrency } from "@/lib/formatCurrency";

type FormattedAmountProps = {
  amount: number;
  currency?: string;
  decimals?: number;
  prefix?: string;
  className?: string;
};

const FormattedAmount: React.FC<FormattedAmountProps> = ({
  amount,
  currency = "৳",
  decimals = 2,
  prefix = "",
  className = "",
}) => {
  return <span className={className}>{prefix}{formatCurrency(amount, currency, decimals)}</span>;
};

export default FormattedAmount;
