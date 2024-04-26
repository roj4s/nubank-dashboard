import ExpensesDataGrid from "./datagrid";
import ExpensesPieChart from "./expensespiechart";

export default function DataViz() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-10">
      <ExpensesPieChart />
      <ExpensesDataGrid />
    </div>
  );
}
