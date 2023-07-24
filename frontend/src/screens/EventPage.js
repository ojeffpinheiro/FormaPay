import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  addParticipantToEvent,
  getParticipantsFromDatabase,
} from "../services/firebaseFunctions";

import "../styles/EventPage.css";

const EventPage = () => {
  const location = useLocation();
  const { id, description, amount } = location.state.event;

  const [nameParticipant, setNameParticipant] = useState("");
  const [participants, setParticipants] = useState([]);

  async function fetchData() {
    try {
      const participantsFromDatabe = await getParticipantsFromDatabase(id);
      if (participants) {
        setParticipants(participantsFromDatabe);
      }
    } catch (error) {
      setParticipants([]);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleAddParticipant = () => {
    if (nameParticipant.trim() !== "") {
  
      addParticipantToEvent(id, nameParticipant)
        .then(() => {
            fetchData();
            setNameParticipant("");
            // Adicionar feedback de sucesso ao usuário (opcional)
          })
        .catch((error) => {
          console.error("Erro ao adicionar participante:", error);
          // Caso ocorra um erro inesperado, reverter o estado local para evitar inconsistências
          // (neste caso, não é necessário fazer nada, pois o estado já foi atualizado)
          // Adicionar feedback de erro ao usuário (opcional)
        });
    }
  };

  return (
    <div className="event-page-container">
      <h1 className="event-title">Evento: {description}</h1>
      <p className="event-info">
        Valor do evento: <span className="amount">R$ {amount.toFixed(2)}</span>
      </p>

      <div className="participants-container">
        <h2>Alunos Participantes:</h2>
        {participants.length > 0 ? (
          <ul className="participants-list">
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
        ) : (
          <p>Não há alunos participantes ainda.</p>
        )}
      </div>

      <div className="add-participant-container">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={nameParticipant}
          onChange={(e) => setNameParticipant(e.target.value)}
        />
        <button onClick={handleAddParticipant}>Adicionar Aluno</button>
      </div>

      <button className="back-button" onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
};

export default EventPage;
