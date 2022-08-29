import { Text } from "react-native";
import { useLayoutEffect } from "react";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  return <Text>All ManageExpense screen</Text>;
}

export default ManageExpense;
