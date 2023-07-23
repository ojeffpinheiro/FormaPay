import React from "react";
import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  const { description, amount, numParticipants } = event;

  return (
    <div className="event-card">
      <h3>{description}</h3>
      <p>Valor: R$ {amount.toFixed(2)}</p>
      <p>Alunos Participantes: {numParticipants}</p>
    </div>
  );
};

export default EventCard;
