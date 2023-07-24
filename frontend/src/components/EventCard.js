import React from "react";
import "../styles/EventCard.css";

const EventCard = ({ event, onClick }) => {
  const { description, amount, numParticipants } = event;

  return (
    <button className="event-card" onClick={onClick} >
      <h3>{description}</h3>
      <p>Valor: R$ {amount.toFixed(2)}</p>
      <p>Alunos Participantes: {numParticipants}</p>
    </button>
  );
};

export default EventCard;
