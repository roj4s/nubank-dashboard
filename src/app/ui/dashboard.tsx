"use client";

import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import Dropzone from "../components/dndarea";
import { ActionTypeEnum, Expense, ExpensesContext } from "../context/store";
import { csvStrToArray } from "../utils/csv";

export default function Dashboard() {
  const { state, dispatch } = useContext(ExpensesContext);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (files.length) {
      const fr = new FileReader();

      fr.onload = function () {
        console.log("read");
        const text = fr.result;
        const arr = csvStrToArray(text as string);

        console.log(arr);

        const expenses: Expense[] = arr
          .filter((r) => {
            const cols = ["category", "date", "title", "amount"];
            for (let i = 0; i < cols.length; i++) {
              if (!(cols[i] in r)) return false;
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

  const handleFiles = (files: File[]) => {};

  return (
    <div>
      {!state.expenses.length && (
        <Dropzone
          activeText="Pode soltar"
          inactiveText="Joge seus CSV do Nubank aqui"
          onUpload={(files) => {
            setFiles(files);
          }}
        />
      )}
      {Boolean(state.expenses.length) && (
        <table>
          <thead>
            <tr>
              <td>Category</td>
              <td>Title</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {state.expenses.map((exp: Expense) => (
              <tr key={exp.id}>
                <td>{exp.category}</td>
                <td>{exp.title}</td>
                <td>{exp.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
