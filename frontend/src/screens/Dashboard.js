import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  getEventsFromDatabase,
  insertExpense,
} from "../services/firebaseFunctions";

import EventCard from "../components/EventCard";
import ExpenseEntryModal from "../components/modals/ExpenseEntryModal";
import PaymentEntryModal from "../components/modals/PaymentEntryModal";
import PaymentReportModal from "../components/modals/PaymentReportModal";

import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentReportModalOpen, setIsPaymentReportModalOpen] = useState(
    false
  );
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para armazenar o evento selecionado

  // Simulação de dados resumidos
  const summaryData = {
    totalEvents: 5,
    totalExpenses: 2500,
    totalPayments: 1800,
  };

  async function fetchData() {
    try {
      const fetchedEvent = await getEventsFromDatabase();
      setEvents(fetchedEvent);
    } catch (error) {
      console.error("Oops, erro ao obter os eventos", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleEventClick(event) {
    setSelectedEvent(event); // Atualiza o evento selecionado
    navigate("/event", { state: { event } }); // Redireciona para a página de detalhes do evento
  }

  async function handleSaveExpense(newExpense) {
    const { description, amount } = newExpense;
    const id = uuidv4();

    const expense = { id, description, amount };

    try {
      if (newExpense) {
        await insertExpense(expense);
        setIsExpenseModalOpen(false);
      }
    } catch (error) {
      console.error("Oops, erro ao adicionar novo gasto", error);
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
          <p>R$ {summaryData.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total de Pagamentos</h3>
          <p>R$ {summaryData.totalPayments.toFixed(2)}</p>
        </div>
      </div>
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
          onSave={(payment) => {
            // Implementar a lógica para salvar o pagamento no banco de dados, incluindo o evento selecionado
            setIsPaymentModalOpen(false);
          }}
          selectedEvent={selectedEvent} // Passar o evento selecionado como prop
          events={events}
        />
      )}
      <div className="event-cards-container">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => handleEventClick(event)} // Trata o clique no card do evento
            onSelect={() => setSelectedEvent(event)} // Função para atualizar o evento selecionado
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
