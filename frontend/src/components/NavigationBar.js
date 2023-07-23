import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">LOGIN</Link></li>
        <li><Link to="/dashboard">DASHBOARD</Link></li>
        <li><Link to="/expenses-registration">CADASTRO DE GASTOS</Link></li>
        <li><Link to="/payment-registration">REGISTRO DE PAGAMENTOS</Link></li>
        <li><Link to="/payment-report-generation">GERAÇÃO DE RELATÓRIO DE PAGAMENTO</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
