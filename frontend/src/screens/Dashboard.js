import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  // Simulação de dados resumidos
  const summaryData = {
    totalEvents: 5,
    totalExpenses: 2500,
    totalPayments: 1800,
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="action-buttons">
        <Link to="/expenses-registration" className="dashboard-button">
          Cadastrar Gastos
        </Link>
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
    </div>
  );
};

export default DashboardPage;
