import { push, ref, set } from 'firebase/database';
import { database } from '../config/firebaseConfig';

// Função para inserir um novo gasto no banco de dados
export const insertExpense = async (expense) => {
  const expenseRef = ref(database, 'expenses');
  const newExpenseRef = push(expenseRef);

  await set(newExpenseRef, expense)
};
