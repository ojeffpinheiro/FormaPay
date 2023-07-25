import React, { useEffect, useState } from "react";

import { getParticipantsFromDatabase } from "../../services/firebaseFunctions";

import "../../styles/PaymentEntryModal.css";

const PaymentEntryModal = ({ isOpen, onClose, onSave, events }) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState("");
  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Função para carregar os participantes do evento selecionado
  const loadParticipants = async (eventId) => {
    try {
      const participantsData = await getParticipantsFromDatabase(eventId);
      setParticipants(participantsData);
    } catch (error) {
      console.error("Erro ao carregar os participantes:", error);
      setParticipants([]);
    }
  };

  useEffect(() => {
    if (selectedEventId) {
      loadParticipants(selectedEventId);
    }
  }, [selectedEventId, participants]);

  // Função para validar os campos
  const validateFields = () => {
    if (
      selectedEventId.trim() === "" ||
      selectedParticipantId.trim() === "" ||
      isNaN(value) ||
      Number(value) <= 0
    ) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Função para salvar o registro de pagamento
  const handleSavePayment = () => {
    if (validateFields()) {
      onSave({
        eventId: selectedEventId,
        eventName: events.find((event) => event.id === selectedEventId).description,
        studentName: participants.find((participant) => participant.id === selectedParticipantId).studentName,
        value: Number(value),
      });

      // Limpar campos e fechar o modal
      setSelectedEventId("");
      setSelectedParticipantId("");
      setValue(0);
      onClose();
    }
  };

  // Função para lidar com a alteração do evento selecionado
  const handleEventChange = (e) => {
    const selectedEventId = e.target.value;
    setSelectedEventId(selectedEventId);

    // Reset do participante selecionado e valor
    setSelectedParticipantId("");
    setValue(0);
  };

  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Registrar Pagamento</h2>
        <form>
          <div className="form-group">
            <label htmlFor="event">Evento:</label>
            <select
              id="event"
              value={selectedEventId}
              onChange={handleEventChange}
              required
            >
              <option value="">Selecione um evento</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.description}
                </option>
              ))}
            </select>
          </div>
          {selectedEventId && (
            <div className="form-group">
              <label htmlFor="studentName">Nome do Aluno:</label>
              <select
                id="studentName"
                value={selectedParticipantId}
                onChange={(e) => setSelectedParticipantId(e.target.value)}
                required
              >
                <option value="">Selecione um aluno</option>
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.studentName}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="value">Valor Pago:</label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" onClick={handleSavePayment}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentEntryModal;
