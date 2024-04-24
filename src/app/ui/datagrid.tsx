"use client";

import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Expense, ExpensesContext } from "../context/store";

import moment from "moment";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Data",
    width: 200,
    editable: false,
    valueGetter: (value, row) => moment(value).format("YYYY-MM-DD"),
  },
  {
    field: "category",
    headerName: "Categoria",
    width: 150,
    editable: false,
  },
  {
    field: "title",
    headerName: "Titulo",
    type: "string",
    width: 250,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Gasto",
    sortable: false,
    width: 90,
    type: "number",
  },
];

export default function ExpensesDataGrid() {
  const { state, dispatch } = useContext(ExpensesContext);
  const [rows, setRows] = useState<Expense[]>([]);

  useEffect(() => {
    console.log(state.currentCategory);
    if (state.currentCategory === "todos") {
      setRows(state.expenses);
    } else {
      setRows(
        state.expenses.filter((e) => e.category === state.currentCategory)
      );
    }
  }, [state.expenses, state.currentCategory]);

  return (
    <Box sx={{ height: 375, width: 700 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
