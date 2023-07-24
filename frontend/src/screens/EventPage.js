import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

import {
  addParticipantToEvent,
  getParticipantsFromDatabase,
} from "../services/firebaseFunctions";

import { ParticipantsList } from "../components/ParticipantsList";

import "../styles/EventPage.css";

const EventPage = () => {
  const location = useLocation();
  const { id, description, amount } = location.state.event;

  const [nameParticipant, setNameParticipant] = useState("");
  const [participants, setParticipants] = useState([]);

  // Buscar os participantes do evento assim que a página for carregada
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const participantsFromDatabase = await getParticipantsFromDatabase(id);
      setParticipants(participantsFromDatabase);
    } catch (error) {
      console.error("Erro ao buscar participantes:", error);
      setParticipants([]);
    }
  };

  const handleAddParticipant = async () => {
    if (nameParticipant.trim() !== "") {
      try {
        // Adicionar o participante ao evento
        await addParticipantToEvent(id, nameParticipant);
        // Atualizar a lista de participantes
        setParticipants([...participants, nameParticipant]);
        // Limpar o input
        setNameParticipant("");
      } catch (error) {
        console.error("Erro ao adicionar participante:", error);
        // Adicionar feedback de erro ao usuário (opcional)
      }
    }
  };

  const handleRemoveParticipant = async (index) => {
    try {
      // Remover o participante da lista pelo índice
      const updatedParticipants = participants.filter((_, i) => i !== index);
      // Atualizar a lista de participantes
      setParticipants(updatedParticipants);
      // TODO: Remover o participante do evento no banco de dados (implementar a função necessária)
    } catch (error) {
      console.error("Erro ao remover participante:", error);
      // Adicionar feedback de erro ao usuário (opcional)
    }
  };

  return (
    <div className="event-page-container">
      <h1 className="event-title">Evento: {description}</h1>
      <p className="event-info">
        Valor do evento: <span className="amount">R$ {amount.toFixed(2)}</span>
      </p>

      <ParticipantsList
        participants={participants}
        handleRemoveParticipant={handleRemoveParticipant}
      />

      <div className="add-participant-container">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={nameParticipant}
          onChange={(e) => setNameParticipant(e.target.value)}
        />
        <button onClick={handleAddParticipant}>
          <AiOutlineUserAdd />
        </button>
      </div>

      <button className="back-button" onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
};

export default EventPage;
