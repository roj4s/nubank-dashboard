"use client";

import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import Dropzone from "../components/dndarea";
import { ActionTypeEnum, Expense, ExpensesContext } from "../context/store";
import { csvStrToArray } from "../utils/csv";
import DataViz from "./dataviz";

export default function Dashboard() {
  const { state, dispatch } = useContext(ExpensesContext);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (files.length) {
      const fr = new FileReader();

      fr.onload = function () {
        const text = fr.result;
        const arr = csvStrToArray(text as string);

        console.log(arr);

        const expenses: Expense[] = arr
          .filter((r) => {
            const cols = ["category", "date", "title", "amount"];
            for (let i = 0; i < cols.length; i++) {
              if (!(cols[i] in r)) return false;
            }

            if (!r["category"] || r["amount"] === null || r["amount"] < 0) {
              return false;
            }

            return true;
          })
          .map((r) => {
            const exp = r as {
              category: string;
              date: string;
              title: string;
              amount: string;
            };

            return {
              ...r,
              id: uuidv4(),
              date: new Date(exp.date),
              amount: parseFloat(exp.amount),
            } as Expense;
          });

        dispatch({ type: ActionTypeEnum.ADD, expenses });
      };

      files.forEach((file) => {
        fr.readAsText(file);
      });
    }
  }, [files, dispatch]);

  return (
    <div>
      {!state.expenses.length && (
        <div className="flex flex-col gap-2 p-10 w-full">
          <Dropzone
            activeText="Pode soltar"
            inactiveText="Joge seus CSV do Nubank aqui"
            onUpload={(files) => {
              setFiles(files);
            }}
          />
          <a
            className="font-semibold text-sm underline ml-auto"
            href="https://app.nubank.com.br/beta/login/"
          >
            Obtenha o export CSV do extrato da sua fatura no seu perfil do
            Nubank
          </a>
        </div>
      )}
      {Boolean(state.expenses.length) && <DataViz />}
    </div>
  );
}
