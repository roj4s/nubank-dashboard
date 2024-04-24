"use client";

import { useContext, useEffect, useState } from "react";
import { ActionTypeEnum, ExpensesContext } from "../context/store";
import { PieChart } from "@mui/x-charts/PieChart";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";

type Data = {
  id: number;
  value: number;
  label: string;
};

export default function ExpensesPieChart() {
  const [data, setData] = useState<Data[]>([]);
  const { state, dispatch } = useContext(ExpensesContext);

  useEffect(() => {
    const totalByCategory: { [cat: string]: number } = {};

    state.expenses.forEach((exp) => {
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
  }, [state.expenses]);

  return (
    <PieChart
      colors={mangoFusionPalette}
      margin={{ right: 200 }}
      series={[{ data }]}
      width={500}
      height={400}
      onItemClick={(evt, d) => {
        dispatch({
          type: ActionTypeEnum.SET_CURRENT_CATEGORY,
          currentCategory: data[d.dataIndex].label,
        });
      }}
    />
  );
}
