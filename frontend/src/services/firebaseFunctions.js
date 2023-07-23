import { get, push, ref, set } from "firebase/database";
import { database } from "../config/firebaseConfig";

// Função para inserir um novo gasto no banco de dados
export const insertExpense = async (expense) => {
  const expenseRef = ref(database, "events");
  const newExpenseRef = push(expenseRef);

  await set(newExpenseRef, expense);
};

// Função para obter os eventos do banco de dados
export const getEventsFromDatabase = async () => {
  const eventsRef = ref(database, "events");
  try {
    const eventsSnapshot = await get(eventsRef);
    if (eventsSnapshot.exists()) {
      return Object.values(eventsSnapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter os eventos do banco de dados", error);
  }
};
