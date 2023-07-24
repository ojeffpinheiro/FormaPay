import { get, push, ref, set } from "firebase/database";
import { database } from "../config/firebaseConfig";

// Função para inserir um novo gasto no banco de dados
export const insertExpense = async (expense) => {
  const expenseRef = ref(database, "events");
  const newExpenseRef = push(expenseRef);

  const newExpense = { ...expense, participants : [], id: newExpenseRef.key };

  await set(newExpenseRef, newExpense);
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

export const addParticipantToEvent = async (eventId, newParticipant) => {
  const eventRef = ref(database, `events/${eventId}/participants`);
  const newParticipantRef = push(eventRef);
  await set(newParticipantRef, newParticipant);
};

// Função para obter os participantes do evento do banco de dados
export const getParticipantsFromDatabase = async (eventId) => {
  const participantsRef = ref(database, `events/${eventId}/participants`);
  try {
    const participantsSnapshot = await get(participantsRef);
    if (participantsSnapshot.exists()) {
      return Object.values(participantsSnapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter os participantes do evento do banco de dados", error);
  }
};