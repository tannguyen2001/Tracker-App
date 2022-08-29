import { useContext } from "react";

import ExpensesOuput from "../components/ExpensesOutput/ExpensesOuput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expese) => {
    const today = new Date();
    let date7DaysAgo = getDateMinusDays(today, 7);
    return expese.date > date7DaysAgo && expese.date <= today;
  });

  return (
    <ExpensesOuput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registerd for the last 7 days."
    />
  );
}

export default RecentExpenses;
