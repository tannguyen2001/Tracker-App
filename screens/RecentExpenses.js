import { useContext, useEffect, useState } from "react";

import ExpensesOuput from "../components/ExpensesOutput/ExpensesOuput";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  // const [fetchedExpenses, setFetchecExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expese) => {
    const today = new Date();
    let date7DaysAgo = getDateMinusDays(today, 7);
    return expese.date > date7DaysAgo && expese.date <= today;
  });

  if (isFetching) {
    return <LoadingOverLay />;
  }

  return (
    <ExpensesOuput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registerd for the last 7 days."
    />
  );
}

export default RecentExpenses;
