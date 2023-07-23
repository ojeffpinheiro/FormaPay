import React, { useState } from "react";
import "../../styles/PaymentEntryModal.css";

const PaymentEntryModal = ({ isOpen, onClose, onSave, events }) => {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const handleSave = () => {
    // Validation of fields (optional)
    if (selectedEventId.trim() === "" || studentName.trim() === "" || isNaN(amountPaid) || Number(amountPaid) <= 0) {
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
      eventName: selectedEvent.name,
      studentName,
      amountPaid: Number(amountPaid),
    });

    // Clear fields and close the modal
    setSelectedEventId("");
    setStudentName("");
    setAmountPaid("");
    onClose();
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
              onChange={(e) => setSelectedEventId(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="studentName">Nome do Aluno:</label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
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
