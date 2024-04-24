"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

const LS_KEY = "nubank-reports";

export type Expense = {
  id: string;
  category: string;
  date: Date;
  title: string;
  amount: number;
};

type CtxStateType = {
  expenses: Expense[];
  recovered: boolean;
};

export enum ActionTypeEnum {
  ADD,
  SET_INITIAL_STATE_FROM_LOCAL_STORAGE,
  RESET,
}

type ActionType = {
  type: ActionTypeEnum;
  files?: File[];
  expenses?: Expense[];
};

const initialState: CtxStateType = {
  expenses: [],
  recovered: false,
};

const reducer = (state: CtxStateType, action: ActionType) => {
  switch (action.type) {
    case ActionTypeEnum.RESET:
      return { ...state, expenses: [] };

    case ActionTypeEnum.ADD:
      if (!action.expenses?.length) return state;
      return { ...state, expenses: [...state.expenses, ...action.expenses] };

    case ActionTypeEnum.SET_INITIAL_STATE_FROM_LOCAL_STORAGE:
      return { ...state, expenses: action.expenses, recovered: true };

    default:
      return state;
  }
};

export const ExpensesContext = createContext<{
  state: CtxStateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const ExpensesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.recovered) {
      const datafromLs = localStorage.getItem(LS_KEY);
      let newState = {
        ...initialState,
        recovered: true,
      };

      if (datafromLs) {
        newState = {
          ...JSON.parse(datafromLs),
          recovered: true,
        };
      }

      dispatch({
        expenses: newState.expenses,
        type: ActionTypeEnum.SET_INITIAL_STATE_FROM_LOCAL_STORAGE,
      });
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <ExpensesContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
};
