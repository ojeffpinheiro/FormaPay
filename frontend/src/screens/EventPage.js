import React from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/EventPage.css';

function EventPage() {
  let location = useLocation();
  const { description, amount } = location.state.event;

  return (
    <div className="event-page-container">
      <h1 className="event-title">Evento: {description}</h1>
      <p className="event-info">Valor do evento: <span className="amount">R$ {amount.toFixed(2)}</span></p>
      <button className="back-button" onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
}

export default EventPage;
