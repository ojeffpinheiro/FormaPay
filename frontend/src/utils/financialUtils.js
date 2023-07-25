import { getPaymentsFromParticipant } from "../services/firebaseFunctions";

// Função para calcular os valores individuais de pagamento para cada aluno
export const calculateEventValuePerStudent = (
  totalExpenses,
  numParticipants
) => {
  if (numParticipants <= 0) {
    return 0;
  }
  return totalExpenses / numParticipants;
};

// Função para calcular o valor pago pelo aluno com base nos pagamentos registrados
export const calculateAmountPaidByStudent = (payments) => {
  if (payments.length === 0) {
    return 0;
  }
  return payments.reduce((total, payment) => total + payment, 0);
};

export const sumPayments = async (data) => {
  const payments = await getPaymentsFromParticipant(data);
  let totalAmount = 0;
  for (const payment of payments) {
    totalAmount += payment.amount;
  }
  return totalAmount;
};
