import React from "react";
import "../styles/EventCard.css";

/**
 * Componente de cartão de evento.
 * @param {string} description - Descrição do evento.
 * @param {number} amountPerStudent - Valor por aluno.
 * @param {number} numParticipants - Número de participantes no evento.
 * @param {function} onClick - Função de callback para clique no cartão do evento.
 */
const EventCard = ({ description, amountPerStudent, numParticipants, onClick }) => {

  return (
    <button className="event-card" onClick={onClick}>
      <h3>{description}</h3>
      <p>Valor por aluno: R$ {amountPerStudent.toFixed(2)}</p>
      <p>{numParticipants} {numParticipants === 1 ? "participante" : "participantes"}</p>
    </button>
  );
};

export default EventCard;
