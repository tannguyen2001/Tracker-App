import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverLay from "../components/UI/LoadingOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;

  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    await deleteExpense(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    if (isEditting) {
      await updateExpense(editedExpenseId, expenseData);
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      await storeExpense(expenseData);
      expensesCtx.addExpense({
        ...expenseData,
        id: Math.ceil(Math.random() * 1000).toString(),
      });
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverLay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditting ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defautValues={selectedExpense}
      />
      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
