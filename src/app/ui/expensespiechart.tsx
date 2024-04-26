"use client";

import { useContext, useEffect, useState } from "react";
import { ActionTypeEnum, ExpensesContext } from "../context/store";
import { PieChart } from "@mui/x-charts/PieChart";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import { useMediaQuery } from "../../../node_modules/@mui/material/index";

type Data = {
  id: number;
  value: number;
  label: string;
};

export default function ExpensesPieChart() {
  const [data, setData] = useState<Data[]>([]);
  const { state, dispatch } = useContext(ExpensesContext);
  const smScreen = useMediaQuery("(min-width:400px)");

  useEffect(() => {
    if (state.expenses) {
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
    }
  }, [state.expenses]);

  return (
    <div>
      <PieChart
        colors={mangoFusionPalette}
        margin={{ right: 200 }}
        series={[{ data }]}
        /*legend={
          smScreen
            ? {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
              }
            : {
                direction: "col",
                position: { vertical: "middle", horizontal: "right" },
              }
         }*/
        width={smScreen ? 400 : 500}
        height={400}
        onItemClick={(evt, d) => {
          dispatch({
            type: ActionTypeEnum.SET_CURRENT_CATEGORY,
            currentCategory: data[d.dataIndex].label,
          });
        }}
      />
      <p className="text-sm font-light" style={{ marginTop: -20 }}>
        * Click na categoria para filtrar a tabela
      </p>
    </div>
  );
}
