import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { getEventsFromDatabase, insertExpense } from "../services/firebaseFunctions";

import EventCard from '../components/EventCard'
import ExpenseEntryModal from "../components/modals/ExpenseEntryModal";

import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [events, setEvents] = useState([])

  // Simulação de dados resumidos
  const summaryData = {
    totalEvents: 5,
    totalExpenses: 2500,
    totalPayments: 1800,
  };

  async function fetchData(){
    try {
      const fetchedEvent = await getEventsFromDatabase();
      setEvents(fetchedEvent);
      console.log(fetchedEvent);
    } catch (error) {
      console.error("Oops, erro ao obter os eventos", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  async function handleSaveExpense(newExpense){
    const { description, amount } = newExpense;
    const id = uuidv4();

    const expense = { id, description, amount };

    try {
      if(newExpense){
        await insertExpense(expense);
        console.log(expense);
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
        <button onClick={() => setIsExpenseModalOpen(true)} className="dashboard-button">
          Cadastrar Evento
        </button>
        <Link to="/payment-registration" className="dashboard-button">
          Registrar Pagamento
        </Link>
        <Link to="/payment-report-generation" className="dashboard-button">
          Gerar relatório
        </Link>
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
      {isExpenseModalOpen && (
        <ExpenseEntryModal
          isOpen={isExpenseModalOpen}
          onClose={() => setIsExpenseModalOpen(false)}
          onSave={handleSaveExpense}
        />
      )}
      <div className="event-cards-container">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
