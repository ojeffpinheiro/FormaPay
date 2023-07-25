import React, { useEffect, useState } from "react";

import { getParticipantsFromDatabase } from "../../services/firebaseFunctions";

import "../../styles/PaymentEntryModal.css";

const PaymentEntryModal = ({ isOpen, onClose, onSave, events }) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const handleGetParticipants = async (eventId) => {
    const participants = await getParticipantsFromDatabase(eventId);
    setParticipants(participants);
  }

  useEffect(() => {
    handleGetParticipants(selectedEventId);
  }, [selectedEventId]);

  const handleSave = () => {
    // Validation of fields (optional)
    if (selectedEventId.trim() === "" || selectedParticipantId.trim() === "" || isNaN(amountPaid) || Number(amountPaid) <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Find the selected event based on the selectedEventId
    const selectedEvent = events.find(event => event.id === selectedEventId);

    if (!selectedEvent) {
      alert("Evento não encontrado.");
      return;
    }

    // Call the callback function to save the payment entry
    onSave({
      eventId: selectedEvent.id,
      eventName: selectedEvent.description,
      studentName: selectedParticipantId.name,
      amountPaid: Number(amountPaid),
    });

    // Clear fields and close the modal
    setSelectedEventId("");
    setSelectedParticipantId("");
    setAmountPaid("");
    onClose();
  };

  const handleEventChange = (e) => {
    const selectedEventId = e.target.value;
    setSelectedEventId(selectedEventId);

    // Reset the selected participant ID
    setSelectedParticipantId("");
    setAmountPaid("");
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
              required>
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
                required>
                <option value="">Selecione um aluno</option>
                {participants.map(participant => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="amountPaid">Valor Pago:</label>
            <input
              type="number"
              id="amountPaid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="button" onClick={handleSave}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentEntryModal;
