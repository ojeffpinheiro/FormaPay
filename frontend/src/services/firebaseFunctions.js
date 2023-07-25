import { get, push, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { database } from "../config/firebaseConfig";
import { sumPayments } from "../utils/financialUtils";

// Função para inserir um novo gasto no banco de dados
export const insertExpense = async (expense) => {
  try {
    const expenseRef = ref(database, "events");
    const newExpenseRef = push(expenseRef);
    const newExpense = { ...expense, participants: [], id: newExpenseRef.key };
    await set(newExpenseRef, newExpense);
  } catch (error) {
    console.error("Erro ao inserir novo gasto:", error);
    throw error;
  }
};

// Função para obter os eventos do banco de dados
export const getEventsFromDatabase = async () => {
  try {
    const eventsRef = ref(database, "events");
    const eventsSnapshot = await get(eventsRef);
    return eventsSnapshot.exists() ? Object.values(eventsSnapshot.val()) : [];
  } catch (error) {
    console.error("Erro ao obter os eventos do banco de dados", error);
    throw error;
  }
};

// Função para adicionar um novo participante ao evento
export const addParticipantToEvent = async (eventId, participantName) => {
  try {
    const participantsRef = ref(database, `events/${eventId}/participants`);
    const newParticipantRef = push(participantsRef);
    const newParticipant = {
      id: newParticipantRef.key,
      studentName: participantName,
      amountPaid: 0,
    };
    await set(newParticipantRef, newParticipant);
  } catch (error) {
    console.error("Erro ao adicionar novo participante:", error);
    throw error;
  }
};

// Função para obter os participantes do evento do banco de dados
export const getParticipantsFromDatabase = async (eventId) => {
  try {
    const participantsRef = ref(database, `events/${eventId}/participants`);
    const participantsSnapshot = await get(participantsRef);
    return participantsSnapshot.exists()
      ? Object.values(participantsSnapshot.val())
      : [];
  } catch (error) {
    console.error(
      "Erro ao obter os participantes do evento do banco de dados",
      error
    );
    throw error;
  }
};

// Função para adicionar um pagamento ao participante do evento
export const addPaymentToParticipant = async (eventId, participantId, value) => {
  try {
    const paymentRef = ref(
      database,
      `events/${eventId}/participants/${participantId}/payments`
    );
    const currentPaymentSnapshot = await get(paymentRef);
    const currentPayment = currentPaymentSnapshot.val() || [];
    const updatedPayment = [...currentPayment, { id: uuidv4(), value }];
    await set(paymentRef, updatedPayment);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar pagamento ao participante:", error);
    throw error;
  }
};

// Função para obter os pagamentos do participante do evento do banco de dados
export const getPaymentsFromParticipant = async (eventId, participantId) => {
  try {
    const paymentsRef = ref(
      database,
      `events/${eventId}/participants/${participantId}/payments`
    );
    const paymentsSnapshot = await get(paymentsRef);
    return paymentsSnapshot.exists()
      ? Object.values(paymentsSnapshot.val())
      : [];
  } catch (error) {
    console.error("Erro ao obter pagamentos do participante:", error);
    throw error;
  }
};

// Função para encontrar o ID de um participante com base no nome
export const findParticipantIdByName = (participants, participantName) => {
  for (const participant of participants) {
    if (participant.studentName === participantName) {
      return participant.id;
    }
  }
  return null; // Retorna null se o participante não for encontrado
};

// Função para atualizar a quantidade total paga por um participante
export const updateAmountPaid = async (eventId, participantId) => {
  try {
    const newAmountPaid = await sumPayments(eventId, participantId);
    const participantRef = ref(
      database,
      `events/${eventId}/participants/${participantId}`
    );
    await update(participantRef, { amountPaid: newAmountPaid });
  } catch (error) {
    console.error("Erro ao atualizar a quantidade total paga pelo participante:", error);
    throw error;
  }
};
