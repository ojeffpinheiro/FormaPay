import { get, push, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { database } from "../config/firebaseConfig";

import { sumPayments} from '../utils/financialUtils'

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
export const addParticipantToEvent = async (eventId, participantName) => {
  const participantsRef = ref(database, `events/${eventId}/participants`);
  const newParticipantRef = push(participantsRef);

  const newParticipant = { id: newParticipantRef.key, name: participantName, amountPaid: 0 };
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
    console.error(
      "Erro ao obter os participantes do evento do banco de dados",
      error
    );
  }
};

// Função que adiciona o um novo pagamento no participante do evento
export const addPaymentToParticipant = async (data) => {
  const { eventId, participantId, amount } = data;
  const paymentsRef = ref(
    database,
    `events/${eventId}/participants/${participantId}/payments`
  );

  try {
    const currentPaymentsSnapshot = await get(paymentsRef);
    const currentPayments = currentPaymentsSnapshot.val() || [];

    const updatedPayments = [...currentPayments, { id: uuidv4(), amount }];
    await set(paymentsRef, updatedPayments);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar pagamento no banco de dados", error);
    return false;
  }
};

export const getPaymentsFromParticipant = async (data) => {
  const { eventId, participantId } = data;
  const paymentsRef = ref(database, `events/${eventId}/participants/${participantId}/payments`);
  try {
    const paymentsSnapshot = await get(paymentsRef);
    if (paymentsSnapshot.exists()) {
      return Object.values(paymentsSnapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter pagamentos do banco de dados", error);
  }
}

// Função para encontrar o ID de um participante com base no nome
export const findParticipantIdByName = (participants, participantName) => {
  for (const participant of participants) {
    if (participant.studentName === participantName) {
      return participant.id;
    }
  }
  return null; // Retorna null se o participante não for encontrado
};

export const updateAmountPaid = async (data) => {
  const { eventId, participantId  } = data
  try {
    const newAmoutPaid = await sumPayments(data);
    const participantRef = ref(database, `events/${eventId}/participants/${participantId}`);
    await update(participantRef, { amountPaid: newAmoutPaid });
  } catch (error) {
    console.error("Erro ao atualizar a soma dos pagamentos", error);
  }
}