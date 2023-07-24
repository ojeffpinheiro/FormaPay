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

  const [newParticipant, setNewParticipant] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  async function fetchData() {
    try {
      const event = await getParticipantsFromDatabase(id);
      if (event && event.participants) {
        setParticipants(event.participants);
      }
    } catch (error) {
      setParticipants([]);
    }
  }

  const handleAddParticipant = async () => {
    if (newParticipant.trim() !== "") {
      const updatedParticipants = [...participants, newParticipant];

      try {
        // Aguardar a confirmação do banco de dados antes de atualizar o estado local
        const success = await addParticipantToEvent(id, updatedParticipants);
        if (success) {
          setParticipants(updatedParticipants);
          setNewParticipant("");
          // Adicionar feedback de sucesso ao usuário (opcional)
        } else {
          // Caso ocorra um erro na função addParticipantToEvent
          // Reverter o estado local para evitar inconsistências
          // (neste caso, não é necessário fazer nada, pois o estado já foi atualizado)
          // Adicionar feedback de erro ao usuário (opcional)
        }
      } catch (error) {
        console.error("Erro ao adicionar participante:", error);
        // Caso ocorra um erro inesperado, reverter o estado local para evitar inconsistências
        // (neste caso, não é necessário fazer nada, pois o estado já foi atualizado)
        // Adicionar feedback de erro ao usuário (opcional)
      }
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
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
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
