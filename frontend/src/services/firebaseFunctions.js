import { get, push, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid'

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

// Função para adicionar um novo participante ao evento
export const addParticipantToEvent = async (eventId, newParticipant) => {
  const participantsRef = ref(database, `events/${eventId}/participants`);

  try {
    // Obtém a lista de participantes atuais no banco de dados
    const currentParticipantsSnapshot = await get(participantsRef);
    const currentParticipants = currentParticipantsSnapshot.val() || [];

    // Adiciona o novo participante ao array de participantes atual
    const updatedParticipants = [
      ...currentParticipants,
      { id: uuidv4(), name: newParticipant, amountPaid: 0 },
    ];

    // Atualiza a lista de participantes no banco de dados com o novo array
    await set(participantsRef, updatedParticipants);

    // Retorne true para indicar sucesso
    return true;
  } catch (error) {
    // Caso ocorra um erro ao adicionar o participante
    console.error("Erro ao adicionar participante ao evento no banco de dados", error);
    // Retorne false para indicar falha
    return false;
  }
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