import { useContext } from "react";

import ExpensesOuput from "../components/ExpensesOutput/ExpensesOuput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expese) => {
    const today = new Date();
    let date7DaysAgo = getDateMinusDays(today, 7);
    console.log(expese.date, date7DaysAgo);
    return expese.date > date7DaysAgo;
  });

  return (
    <ExpensesOuput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}

export default RecentExpenses;
