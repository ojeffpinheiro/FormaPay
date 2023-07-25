import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  addPaymentToParticipant,
  findParticipantIdByName,
  getEventsFromDatabase,
  getParticipantsFromDatabase,
  insertExpense,
  updateAmountPaid,
} from "../services/firebaseFunctions";

import EventCard from "../components/EventCard";
import ExpenseEntryModal from "../components/modals/ExpenseEntryModal";
import PaymentEntryModal from "../components/modals/PaymentEntryModal";
import PaymentReportModal from "../components/modals/PaymentReportModal";

import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  // State para controle dos modais
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentReportModalOpen, setIsPaymentReportModalOpen] = useState(false);

  // State para armazenar os eventos
  const [events, setEvents] = useState([]);

  // Dados resumidos simulados
  const summaryData = {
    totalEvents: 0,
    totalExpenses: 0,
    totalPayments: 0,
  };

  // Função para buscar os eventos na base de dados
  async function fetchEvents() {
    try {
      const fetchedEvents = await getEventsFromDatabase();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Oops, erro ao obter os eventos", error);
    }
  }

  // Carrega os eventos ao montar o componente
  useEffect(() => {
    fetchEvents();
  }, []);

  // Função para tratar o clique em um evento
  function handleEventClick(event) {
    navigate("/event", { state: { event } });
  }

  // Função para salvar um novo gasto
  async function handleSaveExpense(newExpense) {
    const { description, amountPerStudent } = newExpense;
    const id = uuidv4();

    const expense = { id, description, amountPerStudent };

    try {
      if (newExpense) {
        await insertExpense(expense);
        setIsExpenseModalOpen(false);
        // Atualiza a lista de eventos após inserção
        fetchEvents();
      }
    } catch (error) {
      console.error("Oops, erro ao adicionar novo gasto", error);
    }
  }

  // Função para salvar um novo pagamento
  async function handleSavePayment(newPayment) {
    const { eventId } = newPayment;
    const participants = await getParticipantsFromDatabase(eventId);
    const participantId = await findParticipantIdByName(
      participants,
      newPayment.studentName
    );

    try {
      if (newPayment) {
        await addPaymentToParticipant(eventId, participantId, newPayment.value);
        await updateAmountPaid(eventId, participantId, newPayment.value);
        setIsPaymentModalOpen(false);
        // Atualiza a lista de eventos após inserção
        fetchEvents();
      }
    } catch (error) {
      console.error("Oops, erro ao adicionar novo pagamento", error);
    }
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="action-buttons">
        <button
          onClick={() => setIsExpenseModalOpen(true)}
          className="dashboard-button"
        >
          Cadastrar Evento
        </button>
        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="dashboard-button"
        >
          Registrar Pagamento
        </button>
        <button
          onClick={() => setIsPaymentReportModalOpen(true)}
          className="dashboard-button"
        >
          Gerar relatório
        </button>
      </div>
      <div className="summary-container">
        <div className="summary-card">
          <h3>Total de Eventos</h3>
          <p>{summaryData.totalEvents}</p>
        </div>
        <div className="summary-card">
          <h3>Total de Gastos</h3>
          <p>R$ {summaryData.totalExpenses}</p>
        </div>
        <div className="summary-card">
          <h3>Total de Pagamentos</h3>
          <p>R$ {summaryData.totalPayments}</p>
        </div>
      </div>
      {/* Modais */}
      {isPaymentReportModalOpen && (
        <PaymentReportModal
          isOpen={isPaymentReportModalOpen}
          onClose={() => setIsPaymentReportModalOpen(false)}
          onGenerateReport={() => {}}
        />
      )}
      {isExpenseModalOpen && (
        <ExpenseEntryModal
          isOpen={isExpenseModalOpen}
          onClose={() => setIsExpenseModalOpen(false)}
          onSave={handleSaveExpense}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentEntryModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onSave={handleSavePayment}
          events={events}
        />
      )}
      {/* Lista de eventos */}
      {events.length > 0 ? (
        <div className="event-cards-container">
          {events.map((event) => (
            <EventCard
              key={event.id}
              description={event.description}
              amountPerStudent={event.amountPerStudent}
              numParticipants={
                event.participants ? Object.keys(event.participants).length : 0
              }
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
      ) : (
        <div className="event-cards-container">
          <p>Nenhum evento encontrado</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
