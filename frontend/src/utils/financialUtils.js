import { getPaymentsFromParticipant } from "../services/firebaseFunctions";

/**
 * Função para calcular o valor pago pelo aluno com base nos pagamentos registrados.
 * @param {Array} payments - Array de pagamentos do aluno.
 * @returns {number} - Valor total pago pelo aluno.
 */
export const calculateAmountPaidByStudent = (payments) => {
  if (payments.length === 0) {
    return 0;
  }
  // Utilizando o método reduce para somar os valores dos pagamentos
  return payments.reduce((total, payment) => total + payment.value, 0);
};

/**
 * Função para calcular a soma total dos pagamentos de um participante em um evento.
 * @param {string} eventId - ID do evento.
 * @param {string} participantId - ID do participante.
 * @returns {number} - Soma total dos pagamentos.
 */
export const sumPayments = async (eventId, participantId) => {
  try {
    const payments = await getPaymentsFromParticipant(eventId, participantId);
    // Utilizando o método reduce para somar os valores dos pagamentos
    const totalAmount = payments.reduce((total, payment) => total + payment.value, 0);
    return totalAmount;
  } catch (error) {
    console.error("Erro ao calcular a soma dos pagamentos:", error);
    throw error;
  }
};
