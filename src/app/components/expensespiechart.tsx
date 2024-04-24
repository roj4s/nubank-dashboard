"use client";

import { useEffect, useState } from "react";
import { Expense } from "../context/store";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  blueberryTwilightPalette,
  mangoFusionPalette,
  cheerfulFiestaPalette,
} from "@mui/x-charts/colorPalettes";

type Props = {
  expenses: Expense[];
};

type Data = {
  id: number;
  value: number;
  label: string;
};

export default function ExpensesPieChart({ expenses }: Props) {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const totalByCategory: { [cat: string]: number } = {};

    expenses.forEach((exp) => {
      const prev = totalByCategory[exp.category] ?? 0;
      totalByCategory[exp.category] = prev + exp.amount;
    });

    setData(
      Object.keys(totalByCategory).map((k, i) => {
        return {
          id: i,
          value: totalByCategory[k],
          label: k,
        };
      })
    );
  }, [expenses]);

  return (
    <PieChart
      colors={mangoFusionPalette}
      margin={{ right: 200 }}
      series={[{ data }]}
      width={500}
      height={400}
    />
  );
}
