// Função para calcular os valores individuais de pagamento para cada aluno
export const calculatePaymentPerStudent = (totalExpenses, numParticipants) => {
  if (numParticipants <= 0) {
    return 0;
  }
  return totalExpenses / numParticipants;
};

// Função para somar os pagamentos feitos pelo aluno
export const sumPayments = (payments) => {
  if (payments.length === 0) {
    return 0;
  }
  return payments.reduce((total, payment) => total + payment, 0);
};

// Função para calcular o valor que ainda resta a ser pago
export const calculateRemainingPayment = (totalExpenses, payments) => {
  const totalPayments = sumPayments(payments);
  return totalExpenses - totalPayments;
};
