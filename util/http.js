import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://trackerapp-c8158-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}
