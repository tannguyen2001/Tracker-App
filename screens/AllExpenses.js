import { useContext } from "react";

import ExpensesOuput from "../components/ExpensesOutput/ExpensesOuput";
import { ExpensesContext } from "../store/expense-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOuput expenses={expensesCtx.expenses} expensesPeriod="Total" />
  );
}

export default AllExpenses;
