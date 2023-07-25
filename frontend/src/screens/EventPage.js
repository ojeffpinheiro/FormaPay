import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AiOutlineUserAdd } from "react-icons/ai";

import {
  addParticipantToEvent,
  getParticipantsFromDatabase,
} from "../services/firebaseFunctions";

import ParticipantsList  from "../components/ParticipantsList";

import "../styles/EventPage.css";

const EventPage = () => {
  const location = useLocation();
  const { id, description, amountPerStudent } = location.state.event;

  const [studentName, setStudentName] = useState("");
  const [participants, setParticipants] = useState([]);

  const totalAmount = amountPerStudent * participants.length;

  const fetchData = async () => {
    try {
      const participantsFromDatabase = await getParticipantsFromDatabase(id);
      setParticipants(participantsFromDatabase);
    } catch (error) {
      console.error("Erro ao buscar participantes:", error);
      setParticipants([]);
    }
  };

  // Buscar os participantes do evento assim que a página for carregada
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleAddParticipant = async () => {
    if (studentName.trim() !== "") {
      try {
        // Adicionar o participante ao evento
        await addParticipantToEvent(id, studentName);
        // Atualizar a lista de participantes
        setParticipants([...participants, studentName]);
        // Limpar o input
        setStudentName("");
      } catch (error) {
        console.error("Erro ao adicionar participante:", error);
        // Adicionar feedback de erro ao usuário (opcional)
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [participants])
  
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
        Valor total: <span className="amount">R$ {totalAmount}</span>
      </p>

      <ParticipantsList
        participants={participants}
        handleRemoveParticipant={handleRemoveParticipant}
        valuePerStudent={amountPerStudent} />

      <div className="add-participant-container">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
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
