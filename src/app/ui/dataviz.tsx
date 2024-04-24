import ExpensesDataGrid from "./datagrid";
import ExpensesPieChart from "./expensespiechart";

export default function DataViz() {
  return (
    <div className="flex flex-row">
      <ExpensesPieChart />
      <ExpensesDataGrid />
    </div>
  );
}
